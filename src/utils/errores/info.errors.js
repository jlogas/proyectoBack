const generateUserErrorInfo = (producto) => {
    return `
      One or more properties were incomplete or not valid.
      List of required properties:
      * titulo : Needs to be a string, received ${producto.title}
      * codigo  : Needs to be a string, received ${producto.code}
      * categoria      : Needs to be a string, received ${producto.category}
      *  descripcion:   : Needs to be a string, received${producto.description}
      *  price:   : Needs to be a Number, received${producto.price}
      * stock:   : Needs to be a string, received${producto.stock}


    `;
  };
  
  export default generateUserErrorInfo;