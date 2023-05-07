const {response }=require('express');
const { validationResult }=require('express-validator');

const fieldValidator =(req,res=response, next)=>{

    const errors = validationResult(req);

    if( !errors.isEmpty() ){   //al reves de lo que uno piensa. Te da true cuando no esta vacio y false cuando esta vacio.
        return res.status(400).json({
            ok:false,
            error:errors.mapped()  //hace una mapeo de los errores.
        });
    }

    next();
}

module.exports = {
    fieldValidator,
}