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
http://127.0.0.1:3000/api/seguidores/listadodeseguidores?usuario=Gabriela&skip=0&limit=10

listado de seguidos get
http://127.0.0.1:3000/api/seguidores/listadodeseguidos?usuario=Claudia&skip=0&limit=10

******
Honors
******

(GET) /api/honors -> Devuelve la lista de honors

* Todos los honors
    http://localhost:3000/api/honors/

* Todos los honors con paginado
    http://localhost:3000/api/honors?skip=5&limit=5

* Filtrando por publishing_id o por user:
    http://localhost:3000/api/honors?publishing_id=63dd7371eb363dd740aeb363827c53fe29b63827c53fe298
    http://localhost:3000/api/honors?user=pepito@gmail.com

* Filtrando por publishing_id o por user con paginado:
    http://localhost:3000/api/honors?publishing_id=63dd7371eb363dd740aeb363827c53fe29b63827c53fe298?skip=5&limit=5
    http://localhost:3000/api/honors?user=pepito@gmail.com?skip=5&limit=5

* Filtrando por id
    http://localhost:3000/api/honors/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

(POST) /api/honors -> Crea un nuevo honor
    http://localhost:3000/api/honors

En el body de la petición se pasan un JSON con la información del honor a crear, por ejemplo:
    {
        "publishing_id": 1,
        "user": "usuario@gmail.com"
    }

Al dar de alta se valida que esa publicación no tenga un honor para ese usuario. 

Return:
200 Si se crea el usuario
409 Si el honor es duplicado 

(PUT) /api/honors/:id -> Edita un honor
    http://localhost:3000/api/honors/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

En el body de la petición se pasan un JSON con la información del usuario a editar, por ejemplo:
    {
        "publishing_id": 1,
        "user": "usuario@gmail.com"
    }

Return:
200 Si se crea el usuario
404 Si no se encuentra el usuario a editar

(DELETE) /api/honors/:id -> Borra un honor
    http://localhost:3000/api/honors/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

Return:
200 Si se borra el honor
404 Si no se encuentra el honor a borrar
    
*****
Users
*****

(GET) /api/users -> Devuelve la lista de usuarios

* Todos los usuarios
    http://localhost:3000/api/users/

* Todos los usuarios con paginado
    http://localhost:3000/api/users?skip=5&limit=5

* Filtrando por nombre o por alias:
    http://localhost:3000/api/users?alias=Pepito
    http://localhost:3000/api/users?name=pepito@gmail.com

* Filtrando por nombre o por alias con paginado:
    http://localhost:3000/api/users?alias=Pepito?skip=5&limit=5
    http://localhost:3000/api/users?name=pepito@gmail.com?skip=5&limit=5

* Filtrando por id
    http://localhost:3000/api/users/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

(POST) /api/users -> Crea un nuevo usuario
    http://localhost:3000/api/users

En el body de la petición se pasan un JSON con la información del usuario a crear, por ejemplo:
    {
        "name": "usuario@gmail.com",
        "alias": "usuario",
        "password": "usuario"
    }

Al dar de alta se valida que el alias y el name del usuario sea único, si ya existe se devuelve un error 

Return:
200 Si se crea el usuario
409 Si el alias o el nombre estan duplicados

(PUT) /api/users/:id -> Edita un usuario
    http://localhost:3000/api/users/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

En el body de la petición se pasan un JSON con la información del usuario a editar, por ejemplo:
    {
        "name": "usuario@gmail.com",
        "alias": "usuario",
        "password": "usuario"
    }

Return:
200 Si se crea el usuario
404 Si no se encuentra el usuario a editar

(DELETE) /api/users/:id -> Borra un usuario
    http://localhost:3000/api/users/63dd7371eb363dd740aeb363827c53fe29b63827c53fe298

Return:
200 Si se borra el usuario
404 Si no se encuentra el usuario a borrar