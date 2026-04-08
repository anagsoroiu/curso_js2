// Variables
const marca = document.querySelector('#marca'),
      year = document.querySelector('#year'),
      minimo = document.querySelector('#minimo'),
      maximo = document.querySelector('#maximo'),
      puertas = document.querySelector('#puertas'),
      transmision = document.querySelector('#transmision'),
      color = document.querySelector('#color'),
      max = new Date().getFullYear(),
      min = max - 10;

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); // muestra los automóviles

    // Llena las opciones de años
    llenarSelect();
});

// Event listener para los select de búsqueda
marca.addEventListener('change', (e) =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', (e) =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', (e) =>{
    datosBusqueda.minimo = e.target.value;
    
    filtrarAuto();
});

maximo.addEventListener('change', (e) =>{
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', (e) =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', (e) =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', (e) =>{
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

// Funciones
function mostrarAutos(autos){
    limpiarHTML(); // Elimina el HTML previo

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - 
            Transmisión: ${transmision} - Precio: ${precio}
            - Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for(let i = max; i > min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año
    }
}

// Función que filtra en base de la búsqueda
function filtrarAuto(){
    const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }

    return true;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === year;
    }

    return true;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }

    return true;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }

    return true;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }

    return true;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }

    return true;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }

    return true;
}