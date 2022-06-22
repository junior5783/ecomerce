const {save, getAll, getById, deleteById} = require('../repositories/product-repository');
const NotFoundError = require('../exceptions/NotFoundError');

const getProducts = async () => {
    try {
        return await getAll();
    }catch(error){
        throw error;
    }
};

const saveProduct = async product => {
    try {
        await save(product);
    }catch(error){
        throw error;
    }
};

const deleteProductById = async id => {
    try {
        const product = await getById(id);

        if(!product){
            throw new NotFoundError('El producto no existe.');
        }

        await deleteById(id);
    }catch(error){
        throw error;
    }
};

const getProductById = async id => {
    try {
        const product = await getById(id);

        if(!product){
            throw new NotFoundError('El producto no existe.');
        }

        return product;
    }catch(error){
        throw error;
    }
};

const updateProduct = async product => {
    try {
        const productInRepository = await getProductById(product.id);

        if(!productInRepository){
            throw new NotFoundError('El producto no existe.');
        }

        await deleteById(product.id);
        await save(product);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getProducts,
    saveProduct,
    deleteProductById,
    getProductById,
    updateProduct
};