document.addEventListener('DOMContentLoaded', () => {
    const comprarButtons = document.querySelectorAll('.comprar-btn');
  
    comprarButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const carritoId = event.target.dataset.carritoId;
  
        try {
          const response = await fetch(`/api/carrito/${carritoId}/crear-ticket`, {
            method: 'POST',
          });
  
          if (response.ok) {
            alert('Ticket creado exitosamente');
           

          } else {
            console.error('Error al crear el ticket');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      });
    });
  });
  