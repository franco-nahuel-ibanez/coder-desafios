const { normalize, schema } = require('normalizr');

function normalizar(mensajes) {
    const author = new schema.Entity("author");
    const mensaje = new schema.Entity(
    "mensaje",
        { author: author },
        { idAttribute: "_id"}
    );
    const listaDeMensajes = new schema.Entity("mensajes", {
        mensajes: [mensaje],
    });

    const original = { id: "mensajes", mensajes }
    return normalize(original, listaDeMensajes);
}

module.exports = normalizar