class Product {
    constructor(name, description, code){
        this.timestamp = Date.now();
        this.name = name;
        this.description = description;
        this.code = code;
        this.price = 0.0;
        this.stock = 0;
    }

    set id(id){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    set name(name){
        if(!name?.trim()){
            throw 'The name should have a value';
        }
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set description(description){
        this._description = description;
    }

    get description(){
        return this._description;
    }

    set code(code){
        this._code = code;
    }

    get code(){
        return this._code;
    }

    set photo(photo){
        if(!photo?.trim()){
            throw 'The photo should have a value';
        }
        this._photo = photo;
    }

    get photo(){
        return this._photo;
    }

    set price(price){
        this._price = price;
    }

    get price(){
        return this._price;
    }

    set stock(stock){
        this._stock = stock;
    }

    get stock(){
        return this._stock;
    }

    toJSON(){
        const {id, timestamp, name, description, code, photo, price, stock} = this;

        return {id, timestamp, name, description, code, photo, price, stock};
    }

}

module.exports = Product;