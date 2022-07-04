const fs = require('fs').promises;

/**
 * This class works with .txt file extension only.
 */
class Container{

  constructor(fileName){
    this.fileName = fileName;
  }

  file = [];

  async init(){
    try {
      if(await this.#fileExist()) await this.getFile();
    } catch (error) {
      console.log(error);
    }
  }

  async getFile(){
    try {
      const data = await fs.readFile(`./${this.fileName}.txt`,'utf-8');
      if(!data) return; 
      this.file = JSON.parse(data);
      console.log('Initial data:', this.file?this.file:null);
    } catch (error) {
      console.log(error);
    }
  }

  async #fileExist(){
    try {
      const stats = await fs.stat(`./${this.fileName}.txt`);
      if(!stats.isFile()) throw error;
      return true;
    } catch (error) {
      // await fs.writeFile(`./${this.fileName}.txt`,'','utf-8');
      console.log('The doc does not exist');
      return false;
    }
  }

  async save(obj){
    if(!obj || typeof(obj) != 'object') throw Error('Element not valid.');

    const lastId = this.file[this.file.length-1]?.id;

    obj.id = lastId?lastId+1:1;

    this.file.push(obj);

    try {
      await fs.writeFile(`./${this.fileName}.txt`,JSON.stringify(this.file,null,2),'utf-8');
      console.log('New item added with id: %d', obj.id);
      return obj.id;
    } catch (error) {
      console.log(error);
    }
  }

  getById(id){
    const obj = this.file.filter(f=>f.id == id);
    return !obj.length?null:obj[0];
  }


  async deleteById(id){
    try {
      const data = this.file.filter(f=>f.id != id);
      if(data.length == this.file.length) throw `Item with id ${id} does not exist`;
      await fs.writeFile(`./${this.fileName}.txt`,JSON.stringify(data,null,2),'utf-8');
      this.file = data;
      console.log('Item removed successfully');
    } catch (error) {
      console.log(error);
    }
  }

  getAll(){
    return this.file;
  }

  async deleteAll(){
    try {
      await fs.writeFile(`./${this.fileName}.txt`,'','utf-8');
      this.file = [];
      console.log('Data successfully removed from document');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;