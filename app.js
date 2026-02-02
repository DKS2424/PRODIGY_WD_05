const container = document.querySelector('.container');
const Search = document.querySelector('.Search_box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather_details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Indian cities list with all Karnataka cities
const indianCities = [
    // Karnataka cities
    'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Dharwad', 'Belgaum', 'Gulbarga',
    'Davangere', 'Bellary', 'Bijapur', 'Shimoga', 'Tumkur', 'Raichur', 'Bidar',
    'Hospet', 'Hassan', 'Gadag-Betageri', 'Robertsonpet', 'Bhadravati', 'Chitradurga',
    'Kolar', 'Mandya', 'Chikmagalur', 'Gangavati', 'Bagalkot', 'Ranebennuru',
    'Udupi', 'Karwar', 'Madhugiri', 'Ramanagaram', 'Gokak', 'Yadgir', 'Rabkavi Banhatti',
    'Shahabad', 'Sirsi', 'Sindhnur', 'Tiptur', 'Arsikere', 'Nanjangud', 'Sagara',
    'Sira', 'Puttur', 'Athni', 'Mulbagal', 'Surapura', 'Siruguppa', 'Mudhol',
    'Sidlaghatta', 'Shahpur', 'Saundatti', 'Wadi', 'Manvi', 'Nelamangala',
    'Lakshmeshwar', 'Ramdurg', 'Nargund', 'Tarikere', 'Malavalli', 'Savanur',
    'Lingsugur', 'Vijayapura', 'Chamrajnagar', 'Channapatna', 'Channarayapatna',
    'Chikkaballapur', 'Chikkanayakanahalli', 'Chintamani', 'Koppal', 'Holenarasipura',
    'Harihar', 'Honavar', 'Jamkhandi', 'Karkala', 'Kunigal', 'Hunsur', 'Haveri',
    'Ilkal', 'Humnabad', 'Indi', 'Kanakapura', 'Kadur', 'Kudligi', 'Mudalgi',
    
    // Other major Indian cities
    'Mumbai', 'Delhi', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
    'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad',
    'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali',
    'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
    'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
    'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Chandigarh',
    'Guwahati', 'Solapur', 'Tiruchirappalli', 'Bareilly',
    'Aligarh', 'Tiruppur', 'Moradabad', 'Jalandhar', 'Bhubaneswar', 'Salem',
    'Mira-Bhayandar', 'Warangal', 'Thiruvananthapuram', 'Guntur', 'Bhiwandi',
    'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur',
    'Bhilai', 'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun',
    'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola',
    'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar',
    'Jammu', 'Sangli-Miraj', 'Erode', 'Ambattur', 'Tirunelveli',
    'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur', 'Maheshtala', 'Shimla', 'Puducherry'
];

const searchInput = document.querySelector('.Search_box input');

// Create suggestions dropdown
const suggestionsBox = document.createElement('div');
suggestionsBox.className = 'suggestions-box';
suggestionsBox.style.cssText = `
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    width: 100%;
    max-height: 120px;
    overflow-y: auto;
    border-radius: 0 0 12px 12px;
    margin-top: 150px;
    opacity:0.8.5;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Custom scrollbar styling
const style = document.createElement('style');
style.textContent = `
    .suggestions-box::-webkit-scrollbar {
        width: 6px;
    }
    .suggestions-box::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
    }
    .suggestions-box::-webkit-scrollbar-thumb {
        background: rgba(6, 40, 61, 0.5);
        border-radius: 10px;
    }
    .suggestions-box::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 40, 61, 0.7);
    }
`;
document.head.appendChild(style);

searchInput.parentElement.style.position = 'relative';
searchInput.parentElement.appendChild(suggestionsBox);

// Filter and show suggestions
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    
    if (value === '') {
        suggestionsBox.style.display = 'none';
        suggestionsBox.innerHTML = '';
        return;
    }
    
    const filtered = indianCities.filter(city => 
        city.toLowerCase().startsWith(value.toLowerCase())
    );
    
    if (filtered.length > 0) {
        suggestionsBox.innerHTML = '';
        filtered.forEach(city => {
            const div = document.createElement('div');
            div.textContent = city;
            div.style.cssText = `
                padding: 12px 15px;
                cursor: pointer;
                color: #06283d;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            div.addEventListener('mouseover', () => {
                div.style.backgroundColor = 'rgba(6, 40, 61, 0.15)';
            });
            div.addEventListener('mouseout', () => {
                div.style.backgroundColor = 'transparent';
            });
            div.addEventListener('click', () => {
                searchInput.value = city;
                suggestionsBox.style.display = 'none';
                suggestionsBox.innerHTML = '';
            });
            suggestionsBox.appendChild(div);
        });
        
        // Adjust height based on number of suggestions
        if (filtered.length <= 3) {
            suggestionsBox.style.maxHeight = 'none';
            suggestionsBox.style.overflowY = 'visible';
        } else {
            suggestionsBox.style.maxHeight = '120px';
            suggestionsBox.style.overflowY = 'auto';
        }
        
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
        suggestionsBox.innerHTML = '';
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.parentElement.contains(e.target)) {
        suggestionsBox.style.display = 'none';
    }
});

Search.addEventListener('click', () => {
    const APIKey = '42d772b73b4a8c1adc221985e447bb4a';
    const city = document.querySelector('.Search_box input').value;
    console.log(city)
    if (city == '')
        return;
    
    // Hide suggestions when searching
    suggestionsBox.style.display = 'none';
    
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