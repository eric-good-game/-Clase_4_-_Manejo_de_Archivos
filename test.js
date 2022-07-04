const Container = require('./classContainer.js');

async function init(){

  const idProducts = [1,100];
  const products = new Container('products');

  console.log('products.init()');
  await products.init();

  console.log('');
  console.log('products.save(obj)');
  await products.save({
    title: 'Transportador',
    price: 56.90,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
  })

  console.log('');
  console.log('products.getById(id)');
  idProducts.forEach((id)=>{
    const product = products.getById(id);

    console.log('Product with id:',id);
    console.log(product);
  })
  
  console.log('');
  console.log('products.deleteById(id)');

  await products.deleteById(1);
  await products.deleteById(100);

  console.log('');
  console.log('products.getAll()');
  const docs = products.getAll();
  console.log('docs:',docs);

  // console.log('');
  // console.log('products.deleteAll()');
  // console.log('Items before call funciton', products.file.length);
  // await products.deleteAll();
  // console.log('Items after call funciton',products.file.length);
  // console.log('');

}
init();