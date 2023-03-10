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

    async getProductById(id){
        try{
            const products = await this.getAllProducts();
            const result = products.find( prod => prod.id==id);
            return result;
        }catch(error){

        }
    }

    async createProduct(newProduct){
        try{
            const products= await this.getAllProducts();
            newProduct.id=products.length+1;
            newProduct.price=parseInt(newProduct.price) //Parseo el numero a entero porque estaba como string.
            products.push(newProduct);

            await fs.promises.writeFile(this.filePath, JSON.stringify(products));
            return newProduct;

        }catch(error){
            console.log(error);
            return null;
        }
    }

    async deleteProductById(id){
        try {
            const products = await this.getAllProducts();
            const newArrayProducts = products.filter( prod => prod.id != id); // Filtro los elementos del array para que me devuelva los que tienen un Id distinto.
            await fs.promises.writeFile(this.filePath, JSON.stringify(newArrayProducts));
            return newArrayProducts;
        } catch(error){
            console.log(error);
            return null;
        }
    }

}

module.exports = {Container};