(function(){
    let DB,
        idCliente;

    const nombreInput = document.querySelector('#nombre'),
          emailInput = document.querySelector('#email'),
          telefonoInput = document.querySelector('#telefono'),
          empresaInput = document.querySelector('#empresa'),
          formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();

        // Actualiza el registro
        formulario.addEventListener('submit', actualizarCliente);
        
        // Verificar el id de la url
        const parametroURL = new URLSearchParams(window.location.search);
        
        idCliente = parametroURL.get('id');

        if(idCliente){
            setTimeout(()=>{
                obtenerCliente(idCliente);
            },100);
        }
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }
    }
    
    function actualizarCliente(e){
        e.preventDefault();

        if(nombreInput.value === ''
            || emailInput.value === ''
            || empresaInput.value === ''
            || telefonoInput.value === ''
        ){
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // Actualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente),
        }
        const transaction = DB.transaction(['crm'], 'readwrite'),
              objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            imprimirAlerta('Editado correctamente');

            setTimeout(() =>{
                window.location.href = 'index.html';
            }, 3000);
        }

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error', 'error');
        }
    }

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readwrite'),
              objectStore = transaction.objectStore('crm'),
              cliente = objectStore.openCursor();
        
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente){
        const {nombre, email, telefono, empresa} = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }
})();