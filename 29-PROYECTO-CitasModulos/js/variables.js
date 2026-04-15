import { generarId } from "./funciones.js";

export const estado ={
    editando: false,
} 

// Objeto de Cita
export const citaObj = {
    id: generarId(),
    mascota: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
}