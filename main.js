"use strict";

getWeather("Los Angeles", "USA");

async function getWeather(city, countryCode)
{
    const cityCoord = await getCoord(city, countryCode);
    const weather = await getCityData(cityCoord[0].lat, cityCoord[0].lon);
    const img = await getImage(city);
    console.log(weather)
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${img.hits[1].largeImageURL})`
}

async function getCoord(cityName, countryCode)
{
    try
    {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}
            ,${countryCode}&appid=${getOpenWeatherKey()}`,
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
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${getOpenWeatherKey()}`,
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

function getOpenWeatherKey()
{
    //bad practice, but this is a free API key
    return "0a7047fb9dfbdd373f66076c81a80a4e";
}

function getPixaBayKey()
{
    return "15015852-74ad25fb66baa6531c44a804c";
}

async function getImage(query)
{
    const pixaImg = await fetch(
        `https://pixabay.com/api/?key=${getPixaBayKey()}&q=${query}`,
        {
            mode: "cors"
        }
    )
    return pixaImg.json()
}