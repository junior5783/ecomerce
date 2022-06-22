const express = require('express');
const productsRouter = require('./routers/product-router');
const shoppingCarRouter = require('./routers/shopping-car-router');
const app = express();
const PORT = process.env.PORT || 8080;

const isAdmin = true;
const isAdminUserMiddleware = (req,res,next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)

    if(!isAdmin && req?.url?.startsWith('/api/productos') && ['POST', 'PUT', 'DELETE'].includes(req.method)){
        return res.status(401).json({message: "Esta API solo esta permitida para administradores"});
    }
    next();
};
const routeNotFound = (req, res, next) => {
    return res.status(404).json({error: -2, ruta: req.url, metodo: req.method});
}

app.use(isAdminUserMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', productsRouter);
app.use('/api/carrito', shoppingCarRouter);
app.use(routeNotFound);

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
app.on('error', error => console.log(`There was an error on the application : ${error}`));