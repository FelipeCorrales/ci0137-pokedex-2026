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
console.log('lista.js cargó. Pokémon en datos:', pokedex.length);


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


// -------------------------------------------------------------
// PASO 2 — dibujar(listaPokemon)
//   Pinta en pantalla las tarjetas de la lista que se le pase.
//   Pistas:
//     - lista.replaceChildren()        -> primero VACIAR el <ul>
//     - for (const pokemon of listaPokemon) { ... }  -> recorrer
//     - lista.append(crearTarjeta(pokemon))          -> colgar cada tarjeta
//     - (opcional) actualizar el contador y mostrar un
//       mensaje si la lista viene vacía
// -------------------------------------------------------------


// -------------------------------------------------------------
// PASO 3 — filtrar()  +  eventos del formulario
//   Lee los criterios del formulario y devuelve la lista filtrada.
//   Pistas:
//     - new FormData(form)              -> leer todos los campos
//     - datos.get('nombre'), datos.get('tipo'), etc.
//     - pokedex.filter((p) => { ... })  -> dejar solo los que cumplen
//     - .sort(...)                      -> ordenar segun "Ordenar por"
//     - quitar tildes antes de comparar (p. ej. una función normalizar)
//
//   Y conectar el formulario con el código (EVENTOS):
//     - form.addEventListener('submit', (e) => { e.preventDefault(); dibujar(filtrar()); })
//           preventDefault evita que la página se recargue
//     - form.addEventListener('input', () => dibujar(filtrar()))  -> filtrar en vivo
// -------------------------------------------------------------


// Al final: primer dibujado al cargar la página
//   dibujar(filtrar());   // (o dibujar(pokedex) mientras no estén los filtros)