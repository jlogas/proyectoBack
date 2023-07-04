const salida = document.getElementById('logout');

salida.addEventListener('submit', async(event)=>{

    event.preventDefault();

    const response = await fetch("api/sessions/logout",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
    });

    const responseData = await response.json();
    if (responseData.status === 'success') {
      
      window.location.replace('/');  
    }
    
})