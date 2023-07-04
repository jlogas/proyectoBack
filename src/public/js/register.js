 const form = document.getElementById('formularioRegistro');

 form.addEventListener('submit',async(event)=>{
    event.preventDefault();//prevenir que la pagina se recargue
    const data = new FormData(form);
    const obj ={};
    data.forEach((value,key)=>(obj[key]= value));
    const response = await fetch('/api/sesssions/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();

    if (responseData.status === 'success') {
        window.location.replace('/login');
    }
 });