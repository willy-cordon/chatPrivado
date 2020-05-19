const socket = io.connect();

//mostramos el mensaje de usuario logueado
socket.on('nuevo_usuario',(datos) => {
    alert('nuevo usuario conectado'+ datos.user);
});

//Todos los clientes escuchan el emit del server
socket.on('nuevo_mensaje',(datos) => {
    $("#cont_messages").append('<p><strong>'+ datos.user+':</strong> '+datos.mensaje +'</p>');
});



function loguear(){
    // alert('logueado')
     correo = $("#correo").val();
     usuario = $("#usuario").val();
     data = {
        "correo":correo,
        "usuario":usuario
    };
    
    socket.emit('datos_usuario',data);
    
    
}

function enviar_msj(){
    console.log('enviando...');
     mensaje = $("#mensaje").val();

     datamsj = {
        "mensaje":mensaje,
        "usuario":usuario
    }
    socket.emit('send_mensaje',datamsj);
}