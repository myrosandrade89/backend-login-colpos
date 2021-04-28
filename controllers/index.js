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
            return res.status(500).json({ error: "Usuario ya registrado" });
        }

    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPersonas = async (req, res) => {
    console.log('Personas...');
    try {
        const personas = await models.Persona.findAll({
            include: []
        });
        return res.status(200).json({personas});
    } catch (e) {
        res.status(500).json({error:error.message});
    }
};

const getUsuario = async (req, res) => {
    console.log('Personas...');
    try {
        const persona = await models.Persona.findAll({
            where: {
                correo:req.query.correo,
                contraseña: req.query.contraseña
            }
        });
        return res.status(200).json({persona});
    } catch (e) {
        res.status(500).json({error:error.message});
    }
};

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
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createUsuario,
    getPersonas,
    getUsuario,
    deleteUsuario
}