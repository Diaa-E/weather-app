"use strict";

const form = document.querySelector("form#weatherForm");

form.addEventListener("submit", e => {

    e.preventDefault();
    getWeather(getCity());
});

async function getWeather(city)
{
    const cityCoord = await getCoord(city);
    if (cityCoord === undefined) return //stop when the city is not found
    const cityData = await getCityData(cityCoord[0].lat, cityCoord[0].lon);
    let img = await getImage(cityCoord[0].name); //Returns an empty hits array if query has no results
    //look for a weather related image in case no results come back from prompt
    if (img.hits.length === 0)
    {
        img = await getImage("Weather");
    }

    updateCity(cityCoord[0].name, cityCoord[0].country); //more accurate city name
    updateDate(cityData.dt);
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${img.hits[getRandom(img.hits.length)].largeImageURL})`;
}

function getCity()
{
    const txtCity = document.querySelector("input#city");
    const city = txtCity.value;
    txtCity.value = "";

    return city ;
}

function updateCity(cityName, Country)
{
    const h2 = document.querySelector("h2");

    h2.textContent = `${cityName}, ${Country}`;
}

function updateDate(dateUnix)
{
    const h3 = document.querySelector("h3");
    h3.textContent = new Date(dateUnix * 1000); //to convert from Unix time, it calculates in seconds while JS in milliseconds
}

function getRandom(upperBound)
{
    return Math.round(Math.random() * upperBound);
}

async function getCoord(cityName)
{
    try
    {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}
            &appid=${getOpenWeatherKey()}`,
            {
                mode: "cors"
            }
        );

        const data = await response.json();
        
        if (data.length === 0) throw new Error("City Not Found");

        return data;
    }
    catch(err)
    {
        errorPanel().showError(err);
    }
}

async function getCityData(lat, long)
{
    try
    {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${getMode()}&appid=${getOpenWeatherKey()}`,
            {
                mode: "cors"
            }
        );

        const data = response.json();
        return data
    }
    catch(err)
    {
        errorPanel().showError(err);
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
    try
    {
        const pixaImg = await fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=${getPixaBayKey()}&q=${query}`,
        {
            mode: "cors"
        }
        )
    return pixaImg.json();
    }
    catch(err)
    {
        errorPanel().showError(err);
    }
}

function getMode()
{
    return document.querySelector("select#mode").value;
}

function errorPanel()
{
    const panel = document.querySelector(".error-panel")

    function showError(newError)
    {
        panel.textContent = newError;
    }

    function clearError()
    {
        panel.textContent = "";
    }

    return {showError, clearError}
}