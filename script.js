const countryContainer = document.querySelector(".countries");
const boton = document.querySelector("#btnPais");

const renderCountry = (data, optionalClass = "") => {
  const country = data.name.common;
  const flag = data.flags.svg;
  const { region, population } = data;
  const [language] = Object.values(data.languages);
  const [currency] = Object.values(data.currencies);

  // const {name: {common: country }} = data;
  const html = `
        <article class="country ${optionalClass}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${country}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row">${population}</p>
            <p class="country__row">${language}</p>
            <p class="country__row">${currency.name}(${currency.symbol})</p>
          </div>
        </article>
    `;
  countryContainer.innerHTML += html;
  countryContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error(`País no encontrado, código ${response.status}`);
      }
      return response.json();
    })
    .then(([data]) => {
      renderCountry(data);
      const neighbour = data.borders;
      if (!neighbour) throw Error("No tiene vecinos");
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(`País no encontrado, código ${response.status}`);
      }
      return response.json();
    })
    .then(([data]) => renderCountry(data, "neighbour"))
    .catch((err) => console.log("MENSAJE ERROR:", err.message));
};

boton.addEventListener("click", () => {
  getCountryData("australia");
  boton.style.display = "none";
});
const getJSON = function (url, errMessage) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error(errMessage);
    }
    return response.json();
  });
};

//Crea una función whereami que coja como entrada la longitud (lat) y la longitud(lng). Esto son coordenadas GPS, abajo de proporciono datos de ejemplo.

// Haz geolocalización inversa de las coordenadas. Geolocalización inversa significa convertir las coordenadas a una localidad y un país.
//Usa esta API para conseguirlo: https://geocode.xyz/api. La llamada tendrá el siguiente formato: https://geocode.xyz/52.508,13.381?geoit=json.
//Usa la fetch API y promesas.

// Muestra todos los datos recibidos por consola. Usando estos datos escribe en consola un mensaje similar al siguiente: "Estás en Berlin, Germany".

// Encadena un método catch a la cadena de promesas y muestra los errores por consola.

// Esta API permite realizar 3 peticiones por segundo. Si recargas rápido la página obtendrás un error 403. En estos casos fetch no hace
//un reject de la promesa, así que lanza un error por tu cuenta con un mensaje adecuado para que se muestre por consola.

// Usa los datos para mostrar el país de las coordenadas introducidas. Utiliza la API de países que hemos visto anteriormente y te proporciono en el fichero script.js.
// *TEST DE COORDENADAS 1: 52.508, 13.381 (Latitud, Longitud)*
// *TEST DE COORDENADAS 2: 19.037, 72.873*
// *TEST DE COORDENADAS 3: -33.933, 18.474*
// Renderiza el país como hemos visto anteriormente.
const locateCityJSON = function (country) {
  fetch(`https://geocode.xyz/${country}?json=1`)
    .then((response) => response.json())
    .then((data) => {
      const lat = data.latt;
      const lng = data.longt;
      whereami(lat, lng);
    })
    .catch((err) => console.log("Error ", err.message));
};
const whereami = (lat, lng) => {
  console.log(lat, lng);
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then((response) => response.json())
    .then((data) => console.log(`Estas en ${data.city}, ${data.country}`))
    .catch((err) => console.log("Error ", err.message));
};
const coordinatesJSON = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then((response) => response.json())
    .then((data) => {
      renderCity(data);
      console.log(data);
    })
    .catch((err) => console.log("Error ", err.message));
};
const renderCity = (data) => {
  const city = data.city;
  const country = data.country;
  const postal = data.postal;
  const timezone = data.timezone;
  const html = `
        <article>
          <div class="country__data">
            <h2 class="country__name">${city}</h2>
            <h3 class="country__region">${country}</h3>
            <p class="country__row">Postal code: ${postal}</p>
            <p class="country__row">Timezone: ${timezone}</p>
          </div>
        </article>
    `;
  countryContainer.innerHTML = html;
  countryContainer.style.opacity = 1;
};

//locateCityJSON("berlin");
//coordinatesJSON(52.508, 13.381);
//coordinatesJSON(19.037, 72.873);
//coordinatesJSON(-33.933, 18.474);

const submited = () => {
  const form_lat = document.querySelector("#validationCustom01");
  const form_long = document.querySelector("#validationCustom02");
  coordinatesJSON(form_lat.value, form_long.value);
};
const searchCity = () => {
  const form_city = document.querySelector("#validationCustom03");
  locateCityJSON(form_city.value);
};
