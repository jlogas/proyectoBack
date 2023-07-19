import { fakerES_MX as faker } from "@faker-js/faker";

const generate = (n) => {
  const productos = [];
  for (let i = 0; i < n; i++) {
    productos.push(generarProducto());
  }
  return productos;
};

const generarProducto = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.uuid(),
    price: faker.commerce.price(),
    status: true,
    stock: faker.datatype.number({ min: 1, max: 100 }),
    category: faker.commerce.department(),
  };
};

export default generate;





