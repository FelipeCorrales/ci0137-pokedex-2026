// =============================================================
//  lista.js  —  Genera la lista de la Pokédex y el buscador.
//  Lo vamos a escribir juntos en clase, siguiendo estas pistas.
//  Los datos ya están en datos.js (no se escriben aquí).
// =============================================================

// Traemos lo que necesitamos de datos.js:
//   pokedex       -> la lista de Pokémon
//   numeroPokedex -> convierte 7 en "#007"
import { pokedex, numeroPokedex } from './datos.js';

// Agarramos elementos del HTML (DOM) con querySelector (como en CSS):
const lista = document.querySelector('.pokemon-list');   // el <ul> vacío
const form = document.querySelector('#buscador form');    // el formulario
const contador = document.querySelector('.contador');     // "10 Pokémon" (si existe)

// Prueba de que el módulo cargó bien (se borra cuando empecemos):
// console.log('lista.js cargó. Pokémon en datos:', pokedex.length);


// -------------------------------------------------------------
// PASO 1 — crearTarjeta(pokemon)
//   Devuelve el <li> de UN Pokémon, con la misma estructura que
//   antes estaba escrita a mano en el HTML.
//   Pistas:
//     - document.createElement('li')  -> crear cada elemento
//     - elemento.className = '...'     -> ponerle su clase CSS
//     - a.href = `detalle.html?id=${pokemon.id}`  -> el enlace con el id
//     - img.src = `assets/${pokemon.slug}.png`    -> la imagen
//     - span.textContent = ...          -> texto seguro (número y nombre)
//     - a.append(img, numero, nombre)   -> colgar los hijos; luego li.append(a)
//     - return li
// -------------------------------------------------------------
function crearTarjeta(pokemon) {
  const li = document.createElement('li');
  li.className = 'pokemon-card';

  const a = document.createElement('a');
  a.className = 'pokemon-card__link';
  a.href = `detalle.html?id=${pokemon.id}`;

  const img = document.createElement('img');
  img.className = 'pokemon-card__imagen';
  img.src = `assets/${pokemon.slug}.png`;
  img.alt = pokemon.nombre;
  img.width = 96;
  img.height = 96;

  const numero = document.createElement('span');
  numero.className = 'pokemon-card__numero';
  numero.textContent = numeroPokedex(pokemon.id);

  const nombre = document.createElement('span');
  nombre.className = 'pokemon-card__nombre';
  nombre.textContent = pokemon.nombre;

  a.append(img, numero, nombre);
  li.append(a);

  return li;
}

function dibujar(listaPokemon) {
  lista.replaceChildren();
  for (const pokemon of listaPokemon) {
    lista.append(crearTarjeta(pokemon));
  }
}

dibujar(pokedex);

// eléctrico o electrico se comparan igual
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filtrar() {
  const datos = new FormData(form); // Leemos los datos del formulario
  const texto = normalizar(datos.get('nombre') ??''); // Normalizamos el texto del input'');
  const tipo = datos.get('tipo') ?? ''; // Leemos el tipo seleccionado
  const soloCapturados = datos.get('capturados') === 'on'; // Checkbox
  const etapa = datos.get('etapa') ?? 'todas'; // Leemos la etapa seleccionada

  return pokedex.filter((pokemon) => {
    if (texto && !normalizar(pokemon.nombre).includes(texto)) return false;
    if (tipo && !pokemon.tipos.includes(tipo)) return false;
    if (soloCapturados && !pokemon.capturado) return false;
    if (etapa !== 'todas' && pokemon.etapa !== etapa) return false;
    return true;
  });
}

form.addEventListener('submit', (event) => { event.preventDefault(); dibujar(filtrar()); });
// form.addEventListener('reset', () => { setTimeout(() => dibujar(filtrar()), 0); });
form.addEventListener('input', () => { dibujar(filtrar()); });
dibujar(filtrar());