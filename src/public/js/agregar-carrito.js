document.addEventListener('DOMContentLoaded', () => {
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');

    agregarCarritoButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productoId = event.target.dataset.productoId;

            try {
                const response = await fetch(`/api/carrito/agregar/${productoId}`, {
                    method: 'POST',
                });

                if (response.ok) {
                    console.log('Producto ingresado al carrito');
                } else {
                    console.error('Error al ingresar el producto al carrito');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        });
    });
});