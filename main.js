"use strict";

getWeather()

async function getWeather()
{
    const cityCoord = await getCoord("london", "GBR");
    const weather = await getCityData(cityCoord[0].lat, cityCoord[0].lon);
    console.log(weather);
}

async function getCoord(cityName, countryCode)
{
    try
    {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}
            ,${countryCode}&appid=${getApiKey()}`,
            {
                mode: "cors"
            }
        );

        const data = response.json()
        return data;
    }
    catch(err)
    {
        console.log(err);
    }
}

async function getCityData(lat, long)
{
    try
    {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${getApiKey()}`,
            {
                mode: "cors"
            }
        );

        const data = response.json();
        return data
    }
    catch(err)
    {
        console.log(err);
    }
}

function getApiKey()
{
    //bad practice, but this is a free API key
    return "0a7047fb9dfbdd373f66076c81a80a4e";
}