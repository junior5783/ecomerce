class NotFoundError{

    constructor(value){
        this.value = value;
        this.message = 'The element has not found';
    }

    get value(){
        return this._value;
    }

    set value(value){
        this._value = value;
    }

    toString = () =>  `${this.value} ${this.message}`;
}

module.exports = NotFoundError;