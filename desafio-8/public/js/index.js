const socket = io();
let table;
let msg;

const author = new normalizr.schema.Entity("author");
const mensaje = new normalizr.schema.Entity("mensaje", { author: author });
const listaDeMensajes = new normalizr.schema.Entity("mensajes", {
  mensajes: [mensaje],
});

const actualizarPorcentaje = (normalizado, denormalizado) => {
    if(normalizado.entities.mensajes.mensajes.mensajes.length == 0) return
    const sizeNoramlizados = JSON.stringify(normalizado).length;
    const sizeDenoramlizados = JSON.stringify(denormalizado).length;

    const porcentaje = Math.round(( sizeDenoramlizados / sizeNoramlizados) * 100);
    document.getElementById("porcentaje").innerHTML = `${porcentaje} %`;
};

const renderChats = (mensajes) => {
    const mensajesDesnormalizados = normalizr.denormalize(
        mensajes.result,
        listaDeMensajes,
        mensajes.entities
    );

    actualizarPorcentaje(mensajes, mensajesDesnormalizados)
    return mensajesDesnormalizados.mensajes
  };

socket.on('products', ({templateProducts, templateMsg, products, messages}) => {
    table = Handlebars.compile(templateProducts)
    const htmlProducts = table({products})

    const chats = renderChats(messages)
    
    msg = Handlebars.compile(templateMsg)
    const htmlMsg = msg({chats})

    document.getElementById('table').innerHTML = htmlProducts;
    document.getElementById('messages').innerHTML = htmlMsg;
})


document.getElementById('formulario').onsubmit = e => {
    e.preventDefault()
    const title = e.target[0].value
    const price = e.target[1].value
    const thumbnail = e.target[2].value
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    socket.emit('addProducts', {title, price, thumbnail} )
}

document.getElementById('formulario-msg').onsubmit = e => {
    e.preventDefault();

    console.log(e.target[0].value)
    const id = e.target[0].value;
    if(!id) return
    const nombre = e.target[1].value;
    const apellido = e.target[2].value;
    const edad = e.target[3].value;
    const alias = e.target[4].value;
    const avatar = e.target[5].value;
    const msg = e.target[6].value;
    
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    e.target[3].value = '';
    e.target[4].value = '';
    e.target[5].value = '';
    e.target[6].value = '';
    
    const t = new Date();
    const newMessage = {
        author: {
            id,
            nombre,
            apellido,
            edad,
            alias,
            avatar
        },
        text: msg,
        date: `${t.toLocaleDateString()} ${t.toLocaleTimeString()}`,
    }
    socket.emit('newMessage', newMessage);
}

socket.on('newProducts', products => {
    const html = table({products});
    document.getElementById('table').innerHTML = html
});

socket.on('messages', messages => {
    const chats = renderChats(messages)
    const html = msg({chats});
    document.getElementById('messages').innerHTML = html
});
