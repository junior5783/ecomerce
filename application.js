const express = require('express');
const productsRouter = require('./routers/product-router');
const shoppingCarRouter = require('./routers/shopping-car-router');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', productsRouter);
app.use('/api/carrito', shoppingCarRouter);

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
app.on('error', error => console.log(`There was an error on the application : ${error}`));