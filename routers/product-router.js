const express = require('express');
const {checkSchema, validationResult} = require('express-validator');
const {Router} = express;
const router = Router();
const {saveProduct, getProducts, getProductById, deleteProductById, updateProduct} = require('../services/product-service');
const Product = require('../models/Product');
const NotFoundError = require('../exceptions/NotFoundError');

const productSchema = {
    id: {
        in: ['params'],
        optional: true,
        errorMessage: 'Id del producto debe ser entero',
        isInt: { options: { min: 1 } },
        toInt: true
    },
    name: {
        notEmpty: true,
        errorMessage: "El nombre no puede estar vacio"
    },
    price: {
        errorMessage: "El precio debe ser un decimal positivo",
        exists: true,
        isFloat: { options: { min: 0 } },
        toFloat: true
    },
    stock: {
        errorMessage: "El stock debe ser un numero positivo",
        exists: true,
        isInt: { options: { min: 1 } },
        toInt: true
    },
    photo: {
        notEmpty: true,
        errorMessage: "Photo no puede estar vacio"
    }
};

router.get('/', async (request, response) => {
    try {
        const products = await getProducts();

        response.json(products);
    }catch(error){
        return response.status(500).json({errors: [error]});
    }
});

router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const product = await getProductById(id);

        response.json(product);
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

router.post('/', checkSchema(productSchema), async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        
        const {name, description, code, price, stock, photo} = request.body;
        const product = new Product(name, description, code);

        product.price = price;
        product.photo = photo;
        product.stock = stock;

        await saveProduct(product);
        response.status(200).json({success: true, message: 'Producto registrado', id: product.id});
    }catch(error){
        return response.status(500).json({errors: [error]});
    }
});

router.put('/:id', checkSchema(productSchema), async (request, response) => {
    try {
        const errors = validationResult(request);
        const {id} = request.params;

        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        
        const {name, description, code, price, stock, photo} = request.body;
        const product = new Product(name, description, code);

        product.id = id;
        product.price = price;
        product.photo = photo;
        product.stock = stock;

        await updateProduct(product);
        response.status(200).json({success: true, message: 'Producto registrado', id: product.id});
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        await deleteProductById(id);
        response.status(200).json({success: true, message: 'Producto eliminado'});
    }catch(error){
        if (error instanceof NotFoundError){
            return response.status(404).json({errors: [error.value]});
        }
        return response.status(500).json({errors: [error]});
    }
});

module.exports = router;