const container = document.querySelector('.container');
const Search = document.querySelector('.Search_box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather_details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

Search.addEventListener('click', () => {
    const APIKey = '42d772b73b4a8c1adc221985e447bb4a';
    const city = document.querySelector('.Search_box input').value;
    console.log(city)
    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()).then(json => {

            if (json.cod == 404) {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;

            }


            const image = document.querySelector('.weather-box img');
            const temprature = document.querySelector('.temprature');
            const description = document.querySelector('.description');

            const Humidity = document.querySelector('.weather_details .Humidity span');
            const Wind = document.querySelector('.weather_details .Wind span');

            if (cityHide.textContent == city) {
                return;
            }
            else {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = "images/clear.png";
                        break;
                    case 'Rain':
                        image.src = "images/rain.png";
                        break;
                    case 'Snow':
                        image.src = "images/snow.png";
                        break;
                    case 'Clouds':
                        image.src = "images/cloud.png";
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = "images/mist.png";
                        break;
                    default:
                        image.src = "images/cloud.png";
                }

                temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                Humidity.innerHTML = `${json.main.humidity}%`;
                Wind.innerHTML = `${parseInt(json.wind.speed)}Km`;




                const infoweather = document.querySelector('.info-weather');
                const infohumidity = document.querySelector('.info_humidity');
                const infowind = document.querySelector('.info_Wind');


                const elcloneInfoweather = infoweather.cloneNode(true);
                const elcloneInfohumidity = infohumidity.cloneNode(true);
                const elcloneInfowind = infowind.cloneNode(true);

                elcloneInfoweather.id = 'clone-info-weather';
                elcloneInfoweather.classList.add('active-clone');


                elcloneInfohumidity.id = 'clone-info-humidity';
                elcloneInfohumidity.classList.add('active-clone');

                elcloneInfowind.id = 'clone-info-Wind';
                elcloneInfowind.classList.add('active-clone');


                setTimeout(() => {
                    infoweather.insertAdjacentElement("afterend", elcloneInfoweather);
                    infohumidity.insertAdjacentElement("afterend", elcloneInfohumidity);
                    infowind.insertAdjacentElement("afterend", elcloneInfowind);
                }, 2200);

                const cloneInfoweather = document.querySelectorAll('.info-weather.active-clone');
                const totalCloneInfoweather = cloneInfoweather.length;
                const CloneInfoweatherFirst = cloneInfoweather[0];

                const cloneInfohumidity = document.querySelectorAll('.info_humidity.active-clone');
                const CloneInfohumidityFirst = cloneInfohumidity[0];

                const cloneInfoWind = document.querySelectorAll('.info_Wind.active-clone');
                const CloneInfoWindFirst = cloneInfoWind[0];

                if (totalCloneInfoweather > 0) {
                    CloneInfoweatherFirst.classList.remove('active-clone');
                    CloneInfohumidityFirst.classList.remove('active-clone');
                    CloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        CloneInfoweatherFirst.remove();
                        CloneInfohumidityFirst.remove();
                        CloneInfoWindFirst.remove();
                    }, 2200);
                }
            }
        });
});