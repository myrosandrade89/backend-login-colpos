const models = require("../database/models");

const createUsuario = async (req, res) => {
    try {
        
        const datos = req.body;
        const exist = await models.Persona.count({
            where: {
                correo:datos.correo
            }
        });
        if (exist<1) {
            const datosPersona = {
                nombre: datos.nombre,
                apellido: datos.apellido,
                correo: datos.correo,
                contraseña: datos.contraseña
            }
            const datosUbicacion = {
                codigoPostal: datos.codigoPostal,
                colonia: datos.colonia,
                calle: datos.calle
            }
            const persona = await models.Persona.create(datosPersona)
            const ubicacion = await models.Ubicacion.create(datosUbicacion)
            const datosUsuario = {
                fechaNacimiento: datos.fechaNacimiento,
                ocupacion: datos.ocupacion,
                numeroTelefonico: datos.numeroTelefonico,
                idPersona: persona.id,
                idUbicacion: ubicacion.id
            }
            const usuario = await models.Usuario.create(datosUsuario)
            return res.status(201).json({
                usuario
            });
        } else {
            return res.status(404).json({ error: "Usuario ya registrado" });
        }

    } catch(error) {
        
        return res.status(400).json({ error: error.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await models.Usuario.findAll({
            include: [
                {
                    model: models.Persona
                },
                {
                    model: models.Ubicacion
                }
            ]
        });
        return res.status(200).json({usuarios});
    } catch (e) {
        res.status(400).json({error:e.message});
    }
};

const getUsuario = async (req, res) => {
    try {
        const persona = await models.Persona.findAll({

            where: {
                correo: req.body.correo,
                contraseña: req.body.contraseña
            },

        });
        const usuario = await models.Usuario.findAll({
            where: {
                idPersona: persona.id
            },
            include: [
                {
                    model: models.Persona
                },
                {
                    model: models.Ubicacion
                }
            ]
        });
        return res.status(201).json({usuario});
    } catch (e) {
        res.status(400).json({error:e.message});
    }
};


const updateUsuario = async(req, res) => {
    try {
        const { numeroTelefonico } = req.params;
        const datos = req.body;
        const datosUsuario = {
            fechaNacimiento: datos.fechaNacimiento,
            ocupacion: datos.ocupacion,
            numeroTelefonico: datos.numeroTelefonico
        }
        const datosPersona = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            correo: datos.correo,
            contraseña: datos.contraseña
        }
        const datosUbicacion = {
            codigoPostal: datos.codigoPostal,
            colonia: datos.colonia,
            calle: datos.calle
        }
        
        const [updated] = await models.Usuario.update(datosUsuario,{
            where: {
                numeroTelefonico: numeroTelefonico
            },
        });
        if (updated) {
          const updatedUsuario = await models.Usuario.findOne({ 
              where: { numeroTelefonico: datos.numeroTelefonico},
              include: []
            });
            const [updated2] = await models.Persona.update(datosPersona,{
                where: {
                    id: updatedUsuario.idPersona
                },
            });
            if (updated2) {
                const [updated3] = await models.Ubicacion.update(datosUbicacion,{
                    where: {
                        id: updatedUsuario.idUbicacion
                    },
                });
                if (updated3) {
                    const usuario = await models.Usuario.findOne({ 
                        where: { numeroTelefonico: datos.numeroTelefonico},
                        include: [
                            {
                                model: models.Persona
                            },
                            {
                                model: models.Ubicacion
                            }
                        ]
                    });
                    return res.status(200).json({ usuario }); 
                }
            }
         
        }
        return res.status(404).json({ error:"Usuario no encontrado" }); 
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

const deleteUsuario = async(req, res) => {
    try {
        const usuarioEliminado = await models.Persona.destroy({
            where: {
                correo: req.body.correo
            }
        })
        return res.status(200).json({usuarioEliminado})
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuario,
    deleteUsuario,
    updateUsuario
}
