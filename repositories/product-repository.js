const Contenedor = require('../utils/Contenedor');
const contenedor = new Contenedor('products.txt');

const getAll = async () => {
    try {
        return await contenedor.getAll();
    }catch(error){
        throw 'There was an error trying to get all products';
    }
};

const save = async product => {
    try {
        const id = await contenedor.save(product.toJSON());

        product.id = id;
    }catch(error){
        throw 'There was an error trying to save the product';
    }
};

const deleteById = async id => {
    try {
        return await contenedor.deleteById(id);
    }catch(error){
        throw 'There was an error trying to get the product by id';
    }
};

const getById = async id => {
    try {
        return await contenedor.getById(id);
    }catch(error){
        throw 'There was an error trying to get the product by id';
    }
};

module.exports = {
    getAll,
    save,
    deleteById,
    getById
};