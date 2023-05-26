import React, { useEffect, useState } from "react"
import "./main.css"
import axios from "axios"
import bg from "../../assets/bg.jpg"


function Main() {
    
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [data, setData] = useState({});
    const [city, setCity] = useState('');
    
    
    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        })
        console.log(long)
        
    }, [])
    

    useEffect(() => {
        const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        axios.get(apiCurrent).then((response) => {
            setData(response.data)
        })
        
    },[long, lat])

    const searchLocation = () => {
        const apiBySearch = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`
        axios.get(apiBySearch).then((response) => {
            setData(response.data)
        })
    }
    
    const background = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: 'top center',
        height: "100vh",
    }
    
    return(
        
        <div style={background}>
        <div className="search-container">
                <input className="search" type="text" placeholder="Search for a city..." value={city} onChange={(e) => setCity(e.target.value)}></input>
                <button className="search-btn" onClick={searchLocation}>Search</button>
            </div>
            <div className="location">
                <div className="city">{data.name}</div>
            </div>
            <div className="current-weather">
                <div className="temperature">{data.main && data.main.temp} &deg;C</div>
                <div className="weather">{data.weather && data.weather[0].main}
                <img src={`http://openweathermap.org/img/w/${data.weather && data.weather[0].icon}.png`} alt="current weather" />
                </div>
                <div className="hi-low">Hi: {data.main && data.main.temp_min} &deg;C Low: {data.main && data.main.temp_max} &deg;C</div>
                <div className="humidity">Humidity: {data.main && data.main.humidity} %</div>
            </div>
        </div>
    )
}

export default Main