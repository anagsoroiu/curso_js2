import Notificacion from '../classes/Notificacion.js';
import AdminCitas from '../classes/AdminCitas.js';
import {citaObj, estado} from './variables.js';
import { 
        formulario, 
        formularioBtn,
        pacienteInput,
        propietarioInput,
        emailInput,
        fechaInput,
        sintomasInput,
    } from './selectores.js';

const citas = new AdminCitas();

const citass = new AdminCitas();
citass.mostrar();

export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

export function submitCita(e){
    e.preventDefault();

    if(Object.values(citaObj).some(valor => valor.trim() === '')){
        const notificacion = new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error',
        });
        notificacion.mostrar();
        return;
    }

    if(estado.editando){
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
    estado.editando = false;
}

export function reiniciarObjetoCita(){
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

export function generarId(){
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita){
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    estado.editando = true;

    formularioBtn.textContent = 'Guardar Cambios';
}