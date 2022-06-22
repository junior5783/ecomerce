const express = require('express');
const {checkSchema, validationResult} = require('express-validator');
const {Router} = express;
const router = Router();
const {saveShoppingCar, deleteShoppingCarById, getProducts, addProduct, deleteProductById} = require('../services/shopping-car-service');
const {getProductById} = require('../services/product-service');
const ShoppingCar = require('../models/ShoppingCar');
const NotFoundError = require('../exceptions/NotFoundError');

const shoppingCarSchema = {
    id: {
        in: ['params'],
        optional: true,
        errorMessage: 'Id del carrito debe ser entero',
        isInt: { options: { min: 1 } },
        toInt: true
    }
};

router.post('/', async (request, response) => {
    try {
        const shoppingCar = new ShoppingCar();

        await saveShoppingCar(shoppingCar);
        response.status(200).json({success: true, message: 'Carrito registrado', id: shoppingCar.id});
    }catch(error){
        return response.status(500).json({errors: [error]});
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        await deleteShoppingCarById(id);
        response.status(200).json({success: true, message: 'Carrito eliminado'});
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

router.get('/:id/productos', async (request, response) => {
    try {
        const {id} = request.params;
        const products = await getProducts(id);

        response.json(products);
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

router.post('/:id/productos', checkSchema(shoppingCarSchema), async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        const {id} = request.params;
        const {productId} = request.body;
        const product = await getProductById(productId);

        await addProduct(id, product);
        response.status(200).json({success: true, message: 'Producto registrado', id: product.id});
    }catch(error){
        return response.status(500).json({errors: [error]});
    }
});

router.delete('/:id/productos/:id_prod', async (request, response) => {
    try {
        const {id, id_prod} = request.params;

        await deleteProductById(id, id_prod);
        response.status(200).json({success: true, message: 'Producto eliminado del carrito'});
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

module.exports = router;