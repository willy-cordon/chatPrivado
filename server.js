const express = require('express');

const app =express();


const http = require('http');

const server = http.createServer(app);

server.listen(3000);

app.use(express.static("public"));

const SocketIo = require('socket.io')

const io = SocketIo.listen(server);

//TODO: implementar una base de datos dinamica
//Creo los arrays para almacenar los id y recorrerlos

UserOnId = new Array();
IdsOnUser = new Array();

io.on('connect',function(socket){
	console.log('nueva conexion establecida id:'+ socket.id);
//Loguea al usuario y emite un mensaje de bienvenida
	socket.on('datos_usuario',function(datos){
		usuario = datos.usuario;
		socketId = socket.id;
		//Guardando user por Id
		UserOnId[socketId] = usuario;
		//Guardadon id por usuario
		if (IdsOnUser[usuario] == null) {
			
			IdsOnUser[usuario] = new Array();
		}
		IdsOnUser[usuario].push(socketId);
		console.log('Usuarios Online');
		console.log('-------usuario por id-------');
		console.log(UserOnId);
		console.log('------- id por usuarios');
		console.log(IdsOnUser);
		console.log('--------Cantidad de users online---------');
		console.log(Object.keys(IdsOnUser).length);

		console.log('correo:'+ datos.correo + 'usuario:' + usuario + 'id_socket' + socketId);

		console.log('---------------------------------------------------------------------------------');


		io.emit('nuevo_usuario',{user:usuario});
	});

//recibe y emite el mensaje a todos los usuarios
socket.on('send_mensaje',function(datos){

	console.log(datos.usuario + 'esta enviando un mensaje');
	io.to(socketId).emit('nuevo_mensaje',{user:datos.usuario, mensaje:datos.mensaje});
});

//---------------------------------

	socket.on('disconnect',function(){
		id_user = socket.id;
//Verificamos si el id existe si lo ecuentra lo borra
		if(UserOnId[id_user]){

			//Capturamos el id del usuario que se encuentra en el objeto UserOnId
			usuario = UserOnId[id_user];
	
			//Borramos el elemento en userOnid
			delete UserOnId[id_user];
			//Capturamos todos los id del usuario en una variable
			array_ids = IdsOnUser[usuario];
			//Recorremos los elementos para obtener la posicion que necesitamos borrar
			for (let i = 0; i < array_ids.length; i++) {
					if(id_user == array_ids[i] ){
						id_to_borrar = i;
					}
	
			}
			//borramos id socket con ayuda de su posicion
			IdsOnUser[usuario].splice(id_to_borrar, 1);
	
			//borrado
			if (IdsOnUser[usuario].length < 1) {
				delete IdsOnUser[usuario];
			}
	
			console.log('usuario' + usuario + 'desconectandose');
			console.log('Usuarios Online');
			console.log('-------usuario por id-------');
			console.log(UserOnId);
			console.log('------- id por usuarios');
			console.log(IdsOnUser);
			console.log('--------Cantidad de users online---------');
			console.log(Object.keys(IdsOnUser).length);

			console.log('------------------------------------------------------');
		}
	})
});
