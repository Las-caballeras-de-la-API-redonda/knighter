// conectar a la base de datos
const readline = require('readline');
const connection = require('./lib/ConectToMongoose');
const Publicaciones = require('./models/Publicaciones');
const followers = require('./models/Followers');

async function main() {
        // preguntar al usuario si está seguro
        const continuar = await preguntaSiNo('Estas seguro, seguro, seguro, que quieres borrar la base de datos? [n]')
        if (!continuar) {
                process.exit();
        }
        // inicializar las colecciones
        await initPublicaciones();
        await initfollowers();

        // desconectamos de la base de datos
        connection.close();
}
main().catch(err => console.log('Hubo un error', err));


async function initPublicaciones() {
// borrar todos los documentos de la colección de Publicaciones
const result = await Publicaciones.deleteMany();
console.log(`Eliminados ${result.deletedCount} post.`);

// crear agentes iniciales
const inserted = await Publicaciones.insertMany([
    
        {
        "fecha": new Date(),
        "usuario": "Gabriela",
        "texto": "texto de prueba",
        "imagen": "bici.jpg",
        
        },
        {
        "fecha": new Date(),
        "usuario": "Gabriela",
        "texto": "texto de prueba",
        "imagen": "bici.jpg",
        }
        
        
]);
console.log(`Creados ${inserted.length} post.`)
}
async function initfollowers() {
        // borrar todos los documentos de la colección de Publicaciones
        const result = await followers.deleteMany();
        console.log(`Eliminados ${result.deletedCount} seguidores.`);
        
        // crear agentes iniciales
        const inserted = await followers.insertMany([
            
                {
                
                "follow_by": "Gabriela",
                "follow_of": "Claudia",
                },

                {
                "follow_by": "Claudia",
                "follow_of": "Gabriela",
                },

                {
                "follow_by": "Claudia",
                "follow_of": "Amelia",
                },
                {
                "follow_by": "Claudia",
                "follow_of": "Monica",
                },
                
                
        ]);
        console.log(`Creados ${inserted.length} seguidores.`)
}
function preguntaSiNo(texto) {
return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });
        interface.question(texto, respuesta => {
        interface.close();
        if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
        }
        resolve(false);
        })
})
}