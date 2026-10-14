// =============================================================
//  ficha.js  —  UNA sola ficha para todos los Pokémon.
//  Lee el id de la dirección (detalle.html?id=7) y arma la página.
//  Lo escribimos juntos en clase. Reemplaza los detalle-pokemon-*.html.
// =============================================================

// De datos.js:
//   buscarPorId   -> encuentra un Pokémon por su id
//   numeroPokedex -> "#007";   totalStats -> suma de las estadísticas
import { pokedex, buscarPorId, numeroPokedex, totalStats } from './datos.js';

const ficha = document.querySelector('#ficha-pokemon');          // el <article> vacío
const carrusel = document.querySelector('#carrusel .carrusel');  // el <ul> del carrusel

const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));
const pokemon = buscarPorId(id);

function mayus(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

function dibujarFicha(p) {
  const tipos = p.tipos.map((t) => `<span class="tipo tipo--${t}">${mayus(t)}</span>`).join(' ');

  const evolucion = p.evolucion
    .map((n) => n === p.nombre
      ? `<li class="cadena-evolutiva__actual" aria-current="true">${n}</li>`
      : `<li>${n}</li>`)
    .join('\n          ');

  const habilidades = p.habilidades
    .map((h) => `          <dt>${h.nombre}${h.oculta ? ' <em>(oculta)</em>' : ''}</dt>\n          <dd>${h.descripcion}</dd>`)
    .join('\n');

  const celdas = Object.values(p.stats)
    .map((v) => `<td style="--valor: ${v}">${v}</td>`)
    .join('\n                ');

  // Frase de "cómo se leen las estadísticas", armada con los propios datos
  const etiquetas = { hp: 'Puntos de Salud', ataque: 'Ataque', defensa: 'Defensa',
    ataqueEsp: 'Ataque Especial', defensaEsp: 'Defensa Especial', velocidad: 'Velocidad' };
  const entradas = Object.entries(p.stats);
  const alta = entradas.reduce((a, b) => (b[1] > a[1] ? b : a));
  const baja = entradas.reduce((a, b) => (b[1] < a[1] ? b : a));
  const lectura = `${p.nombre} destaca en ${etiquetas[alta[0]]} (${alta[1]}) y flojea en ${etiquetas[baja[0]]} (${baja[1]}).`;

  ficha.innerHTML = `
      <h1><span>${numeroPokedex(p.id)}</span> ${p.nombre}</h1>

      <p>${p.descripcion}</p>

      <div class="ficha-pokemon__resumen">
        <figure class="ficha-pokemon__imagen">
          <img src="assets/${p.slug}.png" alt="${p.nombre}, un Pokémon de tipo ${p.tipos.join(' y ')}" width="300" height="300">
          <figcaption>${p.nombre}, el ${p.genus}</figcaption>
        </figure>

        <section id="detalles" class="ficha-pokemon__detalles">
          <h2>Detalles</h2>
          <dl>
            <dt>Peso</dt>
            <dd>${p.peso.toFixed(1)} kg</dd>
            <dt>Tamaño</dt>
            <dd>${p.tamano.toFixed(1)} m</dd>
            <dt>Tipo</dt>
            <dd>${tipos}</dd>
          </dl>
          <h3>Cadena evolutiva</h3>
          <ol class="cadena-evolutiva">
          ${evolucion}
          </ol>
        </section>

        <section id="habilidades" class="ficha-pokemon__habilidades">
          <h2>Habilidades</h2>
          <dl>
            ${habilidades}
          </dl>
        </section>
      </div>

      <section id="estadisticas">
        <h2>Estadísticas</h2>
        <table class="stats-table">
          <caption>Estadísticas base de ${p.nombre}</caption>
          <thead>
            <tr>
              <th abbr="PS">Puntos de Salud</th>
              <th abbr="ATQ">Ataque</th>
              <th abbr="DEF">Defensa</th>
              <th abbr="AT. ESP.">Ataque Especial</th>
              <th abbr="DEF. ESP.">Defensa Especial</th>
              <th abbr="VEL">Velocidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                ${celdas}
            </tr>
          </tbody>
          <tfoot>
            <tr class="stats-table__total">
              <td colspan="6">Total: ${totalStats(p)}</td>
            </tr>
          </tfoot>
        </table>
      </section>`;
}

if (!pokemon) {
  ficha.innerHTML = '<h1>No encontramos ese Pokémon</h1><p><a href="./">Volver</a></p>';
} else {
  document.title = `Pokedex — ${pokemon.nombre}`;
  dibujarFicha(pokemon);
}