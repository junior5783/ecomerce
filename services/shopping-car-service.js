const {save, getAll, getById, deleteById} = require('../repositories/shopping-car-repository');
const NotFoundError = require('../exceptions/NotFoundError');
const ShoppingCar = require('../models/ShoppingCar');

const saveShoppingCar = async shoppingCar => {
    try {
        await save(shoppingCar);
    }catch(error){
        throw error;
    }
};

const deleteShoppingCarById = async id => {
    try {
        const shoppingCar = await getById(id);

        if(!shoppingCar){
            throw new NotFoundError('El carrito no existe.');
        }

        await deleteById(id);
    }catch(error){
        throw error;
    }
};

const getProducts = async shoppingCarId => {
    try {
        const shoppingCars = await getAll();
        const shoppingCar = shoppingCars.find(({id}) => id === Number(shoppingCarId));
        const products = shoppingCar ? shoppingCar.products : [];

        return products;        
    }catch(error){
        throw error;
    }
};

const addProduct = async (id, product) => {
    try {
        const shoppingCar = await getById(id);

        if(!shoppingCar){
            throw new NotFoundError('El carrito no existe.');
        }

        await deleteById(id);
        shoppingCar.products.push(product);
        
        const carrito = new ShoppingCar();
        carrito.id = Number(id);
        carrito.timestamp = shoppingCar.timestamp;
        carrito.products = shoppingCar.products;

        save(carrito);
    }catch(error){
        throw error;
    }
};

const deleteProductById = async (shoppingCarId, productId) => {
    try {
        
        const shoppingCar = await getById(shoppingCarId);

        if(!shoppingCar){
            throw new NotFoundError('El carrito no existe.');
        }

        await deleteById(shoppingCarId);

        const products = shoppingCar.products.filter(({id}) => Number(productId) !== Number(id));

        console.log(products);
        
        const carrito = new ShoppingCar();
        carrito.id = Number(shoppingCarId);
        carrito.timestamp = shoppingCar.timestamp;
        carrito.products = products;

        save(carrito);
    }catch(error){
        throw error;
    }
};

module.exports = {
    saveShoppingCar,
    deleteShoppingCarById,
    getProducts,
    addProduct,
    deleteProductById
};