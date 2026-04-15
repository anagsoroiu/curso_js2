// Selectores
const pacienteInput = document.querySelector('#mascota'),
      propietarioInput = document.querySelector('#propietario'),
      emailInput = document.querySelector('#email'),
      fechaInput = document.querySelector('#fecha'),
      sintomasInput = document.querySelector('#sintomas'),
      formulario = document.querySelector('#nueva-cita'),
      formularioBtn = document.querySelector('#btnEnviar'), 
      contenedorCitas = document.querySelector('#citas'),
      btnEditar = document.querySelector('#btn-editar');

// Objeto de Cita
const citaObj = {
    id: generarId(),
    mascota: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
}

class Notificacion {
    constructor({texto, tipo}){
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar(){
        // Crear la notificación
        const alerta = document.createElement('div');
        // Si es de tipo error, agrega una clase
        alerta.classList.add('alert',
            this.tipo === 'error' ? 'alert-danger': 'alert-success',
            'text-center',
            'my-4'
        );

        // Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove(); // Opcional chaining, si existe se borra
            
        // Mensaje de error
        alerta.textContent = this.texto;

        // Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);
    
        // Quitar despues de 5 segundos
        setTimeout(()=>{
            alerta.remove();
        }, 5000);
    }
}

class AdminCitas{
    constructor(){
        this.citas = [];
    }

    agregar(cita){
        this.citas = [...this.citas, cita];
        this.mostrar();
    }

    editar(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrar();
    }
    
    eliminar(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.mostrar();
    }

    mostrar(){
        // Limpiar el HTML previo
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        // Si hay citas
        if(this.citas.length === 0){
            contenedorCitas.innerHTML = `
                <p class="text-xl mt-5 mb-10 text-center">No hay pacientes</p>
            `;
            return;
        }

        // Generando las citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add(
                'card', 
                'mb-3', 
                'shadow'
            );

            const paciente = document.createElement('p');
            paciente.classList.add('mb-2', 'text-secondary')
            paciente.innerHTML = `<span class="fw-bold text-uppercase">Paciente: </span> ${cita.mascota}`;

            const propietario = document.createElement('p');
            propietario.classList.add('mb-2', 'text-secondary')
            propietario.innerHTML = `<span class="fw-bold text-uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('mb-2', 'text-secondary')
            email.innerHTML = `<span class="fw-bold text-uppercase">E-mail: </span> ${cita.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('mb-2', 'text-secondary')
            fecha.innerHTML = `<span class="fw-bold text-uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('mb-2', 'text-secondary')
            sintomas.innerHTML = `<span class="fw-bold text-uppercase">Síntomas: </span> ${cita.sintomas}`;

            // Botones de eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = {...cita};
            btnEditar.onclick = () => cargarEdicion(clone);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = () => this.eliminar(cita.id);


            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
            contenedorCitas.appendChild(divCita);
        });    
    };
}


const citass = new AdminCitas();
citass.mostrar();

// Eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

let editando = false;

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

const citas = new AdminCitas();

function submitCita(e){
    e.preventDefault();

    if(Object.values(citaObj).some(valor => valor.trim() === '')){
        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error',
        });
        notificacion.mostrar();
        return;
    }

    if(editando){
        citas.editar({...citaObj});
        new Notificacion({
            texto: 'Guardado correctamente',
            tipo: 'exito',
        });
    } else {
        citas.agregar({...citaObj});
        new Notificacion({
            texto: 'Registrado correctamente',
            tipo: 'exito',
        });
    }

    formulario.reset();
    reiniciarObjetoCita();
    editando = false;
}

function reiniciarObjetoCita(){
    // Reiniciar el objeto
    // citaObj.id = generarId();
    // citaObj.mascota = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';

    Object.assign(citaObj,{
        id: generarId(),
        mascota: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: '',
    });

    btnEnviar.textContent = 'Crear cita';
}

function generarId(){
    return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita){
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;

    btnEnviar.textContent = 'Guardar Cambios';
}