import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import "./style.css"

const Temp = () => {
    const[searchValue,setSearchValue] = useState("pune");
    const [tempInfo ,setTempInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a00309835859329f1d7ab17766819447`;

            const res = await fetch(url); // it will return promise
            const data = await res.json();
            const {temp, humidity , pressure} =data.main ;
            const {main: weathermood} =data.weather[0];
            const {name} = data ;
            const {speed} =data.wind;
            const {country ,sunset} =data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo); //simply passing object  

        }
        catch (error){
            console.log(error);

        }
    };

    useEffect(() => {
        getWeatherInfo();
    } ,[])




  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" 
            placeholder='search...'
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />

            <button className="searchButton" type='button' onClick={getWeatherInfo}>
                Search 
            </button>

        </div>
    </div>

    {/* our temp card  */}
    <Weathercard tempInfo={tempInfo} />
    
    </>
  )
}

export default Temp
