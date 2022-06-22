class Product {
    constructor(){
        this.timestamp = Date.now();
        this.products = [];
    }

    set id(id){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    set timestamp(timestamp){
        this._timestamp = timestamp;
    }

    get timestamp(){
        return this._timestamp;
    }

    set products(products){
        this._products = products
    }

    get products(){
        return this._products;
    }

    addProduct(product){
        this.products.push(product.toJSON());
    }

    toJSON(){
        const {id, timestamp, products} = this;

        return {id, timestamp, products};
    }

}

module.exports = Product;