const socket = io();
let user;
const chatBox = document.getElementById('chatBox')



/*=============================================
=              Aplicando SweetAlert           =
=============================================*/
Swal.fire({
    icon: 'info',
    title: "Identificate, por favor!!",
    input: 'text',
    text: "Ingrese el userName para identificarse en el Chat",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas escribir tu Nombre"
        } else {
            // Esto lo hacemos despues del breack!!
            socket.emit('userConnected', { user: value })
        }
    },
    allowOutsideClick: false // esto es para no dejar pasar al usuario si no completa el input, dando cli-ck afuera.
}).then(result => {
    user = result.value;

    // Cargamos el nombre del usuario en el navegador!!
    const myName = document.getElementById('myName')
    myName.innerHTML = user;
})


// Guardar mensaje por usuario y mostrarlo en nuestro log de messages
chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = '';
        }
    }
})


// Escuchamos a todos los usuarios que estan conectados
// recivimos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
socket.on('messageLogs', data => {
    const messageLog = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message}<br/>`
    });
    // Aqui cargamos el renderizado de los mensajes
    messageLog.innerHTML = logs;
})



// 2da - parte
// Aqui escuchamos los nuevos usuarios que se conectan al chat
// Formato --> { user: "Pepe" }
socket.on('userConnected', data => {
    console.log(data);
    let message = `Nuevo usuario conectado: ${data}`
    Swal.fire({
        icon: "info",
        title: 'Nuevo usuario entra al chat!!',
        text: message,
        toast: true,
    })
})


// Extra
// close chatBox
const closeChatBox = document.getElementById('closeChatBox')
closeChatBox.addEventListener('click', evt => {
    socket.emit('closeChat', { close: "close" })
    messageLog.innerHTML = '';
})