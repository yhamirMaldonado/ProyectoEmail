document.addEventListener("DOMContentLoaded",()=>{
    //Crear un objeto
    const email = {
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    }
    
    //crear variables
    const inputNombre = document.querySelector("#nombre");
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const mensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector(".formulario");
    const btnSubmit = document.querySelector('.formulario button[type = "submit"]');
    const btnReset = document.querySelector('.formulario button[type = "reset"]');
    const spinner = document.querySelector("#spinner");

    //agregar eventos 
    inputNombre.addEventListener("input",validar);
    inputEmail.addEventListener("input",validar);
    inputAsunto.addEventListener("input",validar);
    mensaje.addEventListener("input",validar);

    //Evento para Enviar
    formulario.addEventListener("submit",enviarEmail); 
    //evento para resetear
    btnReset.addEventListener("click",(e)=>{
        //prevenir evento por defecto
        e.preventDefault(); 

        //reiniciar el objeto
        resetFormulario(e);
    });
    
    //Creando la funcion enviarEmail
    function enviarEmail(e){
        e.preventDefault(); 
        
        spinner.classList.add("flex"); 
        spinner.classList.remove("hidden");

        //agregando un tiempo de duración 
        setTimeout(()=>{
            spinner.classList.remove("flex");
            spinner.classList.add("hidden"); 

            //tenemos que resetear el formulario 
            resetFormulario(e);

            //Creando una alerta 
            const alertaExito = document.createElement("p"); 
            alertaExito.classList.add("alertaExito"); 
            alertaExito.textContent = "Mensaje enviado correctamente"; 
            
            //añadiendo la alerta al formulario 
            formulario.appendChild(alertaExito); 

            //controlando el tiempo
            setTimeout(()=>{
                alertaExito.remove();
            },2000);
        },3000)
    }

    //creando la funcion validar
    function validar(e){
        if(e.target.id==="nombre"){ 
            email.nombre = e.target.value.trim().toLowerCase();
            return;
        }
        if(e.target.value.trim()===""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta("El email no es valido",e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();
        //comprobando que este lleno los inputs
        comprobarEmail();
    }

    //Creando la funcion mostrar alerta
    function mostrarAlerta(mensaje,referencia){
        //Limpiamos la alerta generado anteriormente
        limpiarAlerta(referencia);

        //Crear el html
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("alerta")

        //inyectando el html
        referencia.appendChild(error);
    }

    //Quitar la alerta 
    function limpiarAlerta(referencia){
        const limpiar = referencia.querySelector(".alerta");
        if(limpiar){
            limpiar.remove();
        }
    }

    //Funcion para validar email
    function validarEmail(email){
        //Expresion regular
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;

        const resultado = regex.test(email);
        return resultado;
    }

    //Funcion para comprobar que los inputs esten rellenos
    function comprobarEmail(){
        console.log(email);
        //Creando un arreglo a partir del objeto
        const arreglo=Object.values(email);
        const arreglo2 = [];
        const [ ,b,c,d] = arreglo;
        //agregando a otro arreglo
        arreglo2.push(b);
        arreglo2.push(c);
        arreglo2.push(d);

        //arreglo.includes("")
        if(arreglo2.includes("")){
            btnSubmit.classList.add("siTransparencia");
            btnSubmit.classList.remove("noTransparencia");
            btnSubmit.disabled = true; 
            return;
        }

        btnSubmit.classList.remove("siTransparencia");
        btnSubmit.classList.add("noTransparencia");
        btnSubmit.disabled = false;
    }

    //Reseteando el formulario
    function resetFormulario(e){
        //reiniciando el objeto
        email.nombre="";
        email.email="";
        email.asunto=""; 
        email.mensaje="";

        //Haciendo Traversing de DOM
        const referencia = e.target.parentElement.parentElement;
        let parrafoAlerta = referencia.querySelectorAll("P");
        //Eliminando los parrafos que tambien pueden aparecer
        parrafoAlerta.forEach((parrafo)=>{
            parrafo.remove();
        })
        //Reseteando el formulario
        formulario.reset();
        //mandando a llamar a comprobarEmail()
        comprobarEmail();
        
    }
});