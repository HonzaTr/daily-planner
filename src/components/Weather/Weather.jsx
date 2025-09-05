import React, { use, useEffect, useState } from 'react'

const PRG_LAT = "50.0875";
const PRG_LONG = "14.421389";

function Weather() {

    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errLocation, setErrLocation] = useState(null);

    const [city, setCity] = useState("Praha");

    useEffect(() => {

            getActualWeather(PRG_LAT, PRG_LONG);
            getLocation(PRG_LAT, PRG_LONG);
            

    }, [])

    const getActualWeather = (lat, long) => {

         fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,wind_speed_10m_max&timezone=Europe%2FBerlin&forecast_days=1`)
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

            setErrLocation("Nepodařilo se zjistit polohu")
            console.log(errLocation);
        }

        )
    }

    console.log(location);

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

    return (
        <section className="weather">
            <header className="weather-header">
                <h2>Aktuální počasí</h2>
            </header>
            <div className="weather-body">
                <h3>Poloha: {location.city}</h3>
                <h3>Maximální teplota: {Math.floor(weather.daily.temperature_2m_max)} °C</h3>
                <h3>Rychlost větru: {weather.daily.wind_speed_10m_max} km/h</h3>
                <button onClick={handleLocation}>Aktuální poloha</button>
            </div>        
        </section>   
  )
}

export {Weather}