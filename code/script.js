const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=Kiruna,Sweden&units=metric&appid=3500e3bacf630605ddf92aeaab386a9e';
const cityName = document.getElementById('city-name');
const container = document.getElementById('main');

console.log('API Fetch starting')
//fetch sends a request to our server
//our js is executing line 11 directly after the fetch
//when the response comes back after x seconds the .then function is executed
//When you got the information from the stream (from server) - only then try to get the json
fetch(WEATHER_URL)
  .then((response) => {
    console.log(`Response OK? ${response.ok}`);
    console.log(`Response Status: ${response.status}`);
    console.log('Response recieved');
    //Now - convert it to json:
    return response.json();
  })
  // the conversion is available to us here:
  .then((data) => {
    
    cityName.innerHTML = ` ${data.city.name}`;

    container.innerHTML = `
      <div>
          <p>Sunrise is: ${new Date((data.city.sunrise + data.city.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          <p>Sunset is: ${new Date((data.city.sunset + data.city.timezone) * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
      </div>
      `;

    const filteredForeast = data.list.filter(item => item.dt_txt.includes('12:00'))
     
    filteredForeast.forEach((weather) => {
      const temp = weather.main.temp; 
      const type = weather.weather[0].description;
      container.innerHTML += `
        <section class="forecast">
          <p>${weather.weather[0].description} </p>
          <p>${weather.main.temp}</p>
        </section>`;
    });
  });

  fetch(WEATHER_URL)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    
  })
console.log('API Fetch Initiation');