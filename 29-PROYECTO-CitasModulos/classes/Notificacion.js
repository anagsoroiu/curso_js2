import {formulario} from "../js/selectores.js";

export default class Notificacion {
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