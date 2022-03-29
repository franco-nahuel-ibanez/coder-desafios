
const socket = io();
let table;
let msg;

socket.on('products', ({products, templateProducts, templateMsg, messages}) => {
    table = Handlebars.compile(templateProducts);
    const htmlProducts = table({products});

    msg = Handlebars.compile(templateMsg);
    const htmlMsg = msg({messages})

    
    document.getElementById('table').innerHTML = htmlProducts
    document.getElementById('messages').innerHTML = htmlMsg
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

    const email = e.target[0].value;
    if(!email) return
    const msg = e.target[1].value;
    
    e.target[0].value = '';
    e.target[1].value = '';

    const t = new Date();
    const newMessage = {
        email,
        date: `${t.toLocaleDateString()} ${t.toLocaleTimeString()}`,
        msg
    }
    socket.emit('newMessage', newMessage);
}

socket.on('newProducts', products => {
    const html = table({products});
    document.getElementById('table').innerHTML = html
});

socket.on('messages', messages => {
    const html = msg({messages});
    document.getElementById('messages').innerHTML = html
});



