import React, { use, useEffect, useState } from 'react'

const DEF_LAT = "50.0875";                //souřadnice pro Prahu
const DEF_LONG = "14.421389";

function Weather() {

    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errLocation, setErrLocation] = useState(null);

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        getActualWeather(DEF_LAT, DEF_LONG);
        getLocation(DEF_LAT, DEF_LONG);

        const interval = setInterval(()=>{

        setTime(new Date);

        }, 1000)

        return() => clearInterval(interval);

    }, [])

    const getActualWeather = (lat, long) => {

         fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=1`)
            .then((response) => {
                if(!response.ok) throw new Error("Server error")
                return response.json();
            })
            .then((data) => {
                setWeather(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setIsLoading(false))
      
    }

    const getLocation = (lat, long) => {

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=cs`)
            .then((response) => {
                if(!response.ok) throw new Error("Server error")
                return response.json();
            })
            .then((data) => {
                setLocation(data);
            })
            .catch((err) => {
                setError(err);
            })
    }

    const handleLocation = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            
            getLocation(position.coords.latitude, position.coords.longitude);
            getActualWeather(position.coords.latitude, position.coords.longitude);

            console.log(position);
        },
        (error) => {

            setErrLocation("Povol sledování polohy v prohlížeči");
            console.log(errLocation);
        }

        )
    }

    const getWeatherIndex = () => {

        const hours = time.getHours();
        
        return hours;
    }

    const actualWeather = () => {

        if(weather.hourly.weather_code[getWeatherIndex()] === 0){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\sun.svg"/>
                    <p>Jasno</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 1 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 2){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-sun.svg"/>
                    <p>Polojasno</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] === 3){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud.svg"/>
                    <p>Zataženo</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] === 45 ||
            weather.hourly.weather_code[getWeatherIndex()] === 48){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud.svg"/>
                    <p>Mlha</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 51 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 57){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-drizzle.svg"/>
                    <p>Mrholení</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 61 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 67){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-rain.svg"/>
                    <p>Déšť</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 71 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 77){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-snow.svg"/>
                    <p>Sněžení</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 80 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 82){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-sun-rain.svg"/>
                    <p>Přeháňky</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 85 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 86){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\sun-snow.svg"/>
                    <p>Sněhové přeháňky</p>
                </div>
            )
        }
        if(weather.hourly.weather_code[getWeatherIndex()] >= 95 &&
            weather.hourly.weather_code[getWeatherIndex()] <= 99){

            return(

                <div className="weather-body-icon">
                    <img src="src\assets\cloud-drizzle.svg"/>
                    <p>Bouřky</p>
                </div>
            )
        }
    }

    console.log(weather);

    if(isLoading){

    return (

        <section className="weather">
            <header className="weather-header">
                <h2>Aktuální počasí</h2>
            </header>
            <div className="weather-body">
                <h3>Loading... </h3>
            </div>  
        </section>   
        )
    }
    
    console.log(time.getHours());
    console.log(location);

    return (
        <section className="weather-section">
            <div className="weather-card">
            <header className="weather-card-header">
                <h2>Dnešní počasí</h2>
            </header>
            <div className="weather-card-body">
                {actualWeather()}
                <div className="weather-body-info">
                    <p className="city-text">{location.city} ({location.countryCode})</p>
                    <p className="temperature-text">{Math.round(weather.hourly.temperature_2m[getWeatherIndex()])}°C</p>
                    <p className="wind-text">{Math.round(weather.hourly.wind_speed_10m[getWeatherIndex()])} km/h</p>
                </div>
            </div>
            <div className="weather-button-area">
                <p style={{color:"red", height:"24px", margin: "10px 0 0 0"}}>{errLocation ? `${errLocation}` : ""}</p>
                <button className="weather-button" onClick={handleLocation}>Aktuální poloha</button>
            </div>
            </div>   
        </section>   
  )
}

export {Weather}