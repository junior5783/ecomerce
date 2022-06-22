const Contenedor = require('../utils/Contenedor');
const contenedor = new Contenedor('shopping-car.txt');

const getAll = async () => {
    try {
        return await contenedor.getAll();
    }catch(error){
        throw 'There was an error trying to get all products';
    }
};

const save = async shoppingCar => {
    try {
        const id = await contenedor.save(shoppingCar.toJSON());

        shoppingCar.id = id;
    }catch(error){
        throw 'There was an error trying to save the shopping car';
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