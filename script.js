const countryContainer = document.querySelector('.countries')
const coord1 = document.querySelector('#submitbtn1')
const coord2 = document.querySelector('#submitbtn2')
const formLat = document.querySelector('#validationCustom01')
const formLong = document.querySelector('#validationCustom02')
const formCity = document.querySelector('#validationCustom03')

const locateCityJSON = function (country) {
  fetch(`https://geocode.xyz/${country}?json=1`)
    .then((response) => response.json())
    .then((data) => {
      const lat = data.latt
      const lng = data.longt
      whereami(lat, lng)
    })
    .catch((err) => console.log('Error ', err.message))
}
const whereami = (lat, lng) => {
  console.log(lat, lng)
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then((response) => response.json())
    .then((data) => console.log(`Estas en ${data.city}, ${data.country}`))
    .catch((err) => console.log('Error ', err.message))
}
const coordinatesJSON = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then((response) => response.json())
    .then((data) => {
      renderCity(data)
      console.log(data)
    })
    .catch((err) => console.log('Error ', err.message))
}
const renderCity = (data) => {
  const city = data.city
  const country = data.country
  const postal = data.postal
  const timezone = data.timezone
  const html = `
        <article>
          <div class="country__data">
            <h2 class="country__name">${city}</h2>
            <h3 class="country__region">${country}</h3>
            <p class="country__row">Postal code: ${postal}</p>
            <p class="country__row">Timezone: ${timezone}</p>
          </div>
        </article>
    `
  countryContainer.innerHTML = html
  countryContainer.style.opacity = 1
}

coord1.addEventListener('click', () => {
  locateCityJSON(formCity.value)
})
coord2.addEventListener('click', () => {
  coordinatesJSON(formLat.value, formLong.value)
})
