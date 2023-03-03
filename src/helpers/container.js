const path = require('path');
const fs = require('fs');

class Container{

    filePath;

    constructor(file){
        this.filePath = path.join(__dirname, `../data/${file}`)
    }

    async getAllProducts(){
        try{
            const data = await fs.promises.readFile(this.filePath, 'utf-8'); //await es para esperar que se resuelva la promesa. EL await no deja pasar a la otra linea hasta que se resuelva la promesa. 
            const products = await JSON.parse(data); //convierto el JSON que recibo a un objeto de Javascript.
            return products;
        }catch(error) {
            console.error(error);
            return{
                error,
                ok:false,
            }   
        }
    }

    async createProduct(){
        try{

        }catch{error}{

        }
    }

}

module.exports = {Container};