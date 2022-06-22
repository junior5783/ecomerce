const fs = require('fs');

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(element){
        const elements = await this.#getElements();
        const id = element?.id ? element.id : this.#getElementId(elements);

        elements.push({...element, id});
        await this.#writeElements(elements);
        
        return id;
    }

    async getById(id){
        const elements = await this.#getElements();
        const element = elements.find(({id: elementId}) => elementId === Number(id));
        
        return element;
    }

    async getAll(){
        return await this.#getElements();
    }

    async deleteById(id){
        const elements = await this.#getElements();
        const filteredElements = elements.filter(({id: elementId}) => elementId !== Number(id));
        
        await this.#writeElements(filteredElements);
    }

    async deleteAll(){
        await this.#writeElements("");
    }

    #getElementId(elements){
        if(elements?.length){
            const {id} = elements[elements.length - 1];

            return id + 1;
        }

        return 1;
    }

    async #getElements(){
        try{
            const contentFile = await fs.promises.readFile(this.fileName, 'utf-8');
            
            return contentFile ? JSON.parse(contentFile) : [];
        }catch(error){
            if(error.code === 'ENOENT'){
                return [];
            }else{
                console.error("There was an error trying to get the elements: ", error);
            }
        }
    }

    async #writeElements(elements){
        try{
            if(elements instanceof Array){
                await fs.promises.writeFile(this.fileName, JSON.stringify(elements));
                return;
            }
            await fs.promises.writeFile(this.fileName, elements);
        }catch(error){
            console.error("There was an error trying to write the elements: ", error);
        }
    }

}

module.exports = Contenedor;