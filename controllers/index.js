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
        return res.status(500).json({ error: error.message });
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
        res.status(500).json({error:e.message});
    }
};

const getUsuario = async (req, res) => {
    console.log('Personas...');
    try {
        const usuario = await models.Usuario.findAll({

            where: {
                numeroTelefonico: req.body.numeroTelefonico
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
        res.status(500).json({error:e.message});
    }
};


const updateUsuario = async(req, res) => {
    console.log('Actualizando...');
    try {
        const { correo } = req.params;
        const datos = req.body;
        const datosPersona = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            correo: datos.correo,
            contraseña: datos.contraseña
        }
        const [updated] = await models.Persona.update(datosPersona,{
            where: {
                correo: correo
            },
        });
        if (updated) {
          const updatedPersona = await models.Persona.findOne({ where: { correo: correo} });
          return res.status(201).json({ post: updatedPersona });
        }
        throw new Error("Usuario no encontrado");
    } catch(e) {
        res.status(500).json({error: e.message});
    }
}

const deleteUsuario = async(req, res) => {
    console.log("Eliminado usuario...");
    try {
        const usuarioEliminado = await models.Persona.destroy({
            where: {
                correo: req.body.correo
            }
        })
        return res.status(200).json({usuarioEliminado})
    } catch(e) {
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuario,
    deleteUsuario,
    updateUsuario
}