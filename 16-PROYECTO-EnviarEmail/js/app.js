document.addEventListener('DOMContentLoaded', () =>{
    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: '',
    }

    const obligatorio = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email'),
          inputAsunto = document.querySelector('#asunto'),
          inputMensaje = document.querySelector('#mensaje'),
          inputCC = document.querySelector('#cc'),
          formulario = document.querySelector('#formulario'),
          btnSubmit = document.querySelector('#formulario button[type="submit"]'),
          btnReset = document.querySelector('#formulario button[type="reset"]'),
          spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();
    });

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 
                'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            
            setTimeout(() =>{
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e){
        if(e.target.value.trim() === ''){
            // El campo CC no es obligatorio
            if(e.target.id === 'cc') {
                limpiarAlerta(e.target.parentElement);
                email.cc = '';
                comprobarEmail();
                return;
            }

            mostrarAletra(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            obligatorio[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAletra('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            obligatorio[e.target.name] = '';
            comprobarEmail();
            return;
        }

        // Validación del email del reto
        if(e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAletra('El email cc no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        if (e.target.name in obligatorio) {
            obligatorio[e.target.name] = e.target.value.trim();
        }


        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAletra(mensaje, referencia){
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
              resultado = regex.test(email);

        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(obligatorio).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
        // Reiniciar el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        obligatorio.email = '';
        obligatorio.asunto = '';
        obligatorio.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});