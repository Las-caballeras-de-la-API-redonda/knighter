
La aplicacion esta disponible en 
http://127.0.0.1:3000

*****Motor de base de datos mongo db
npm install mongoose

***** Iniciar app 
node app.js

****Inicializar los datos
node init-db.js

***Añadir Post o actualizar
http://127.0.0.1:3000/api/listadeposts?id=63dd4d0c46ae886582150988&usuario=Gabriela&texto=texto de prueba&imagen=bici.jpg

borrar post
http://127.0.0.1:3000/api/listadeposts?id=63dd4d0c46ae886582150988


SEGUIDORES:
EMPEZAR A SEGUIR POST
user_to_follow es el usuario al que se va a empezar a seguir
usuario es el usuario que lo va a empezar a seguir
http://127.0.0.1:3000/api/seguidores/empezaraseguir?user_to_follow=Gabriela&usuario=Amelia

Eliminar seguidor DELETE
usuario es el usuario que quiere eliminar de sus seguidores
UsertoDelete es el seguidor del usuario  que queremos eliminar, 
http://127.0.0.1:3000/api/seguidores/eliminarseguidor?usuario=Gabriela&UsertoDelete=Claudia

*****En el caso de dejar de seguir es lo mismo solo que:
usuario es el usuario que queremos dejar de SEGUIR
UsertoDelete es el usuario que desea dejar de seguir al UsertoDelete*******


Listado de seguidores get

listado de seguidos get
http://127.0.0.1:3000/api/seguidores/listadodeseguidos?usuario=Claudia&skip=0&limit=10