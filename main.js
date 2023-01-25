"use strict";

const form = document.querySelector("form#weatherForm");

form.addEventListener("submit", e => {

    e.preventDefault();
    getWeather(getCity());
});

async function getWeather(city)
{
    const cityCoord = await getCoord(city);
    const cityData = await getCityData(cityCoord[0].lat, cityCoord[0].lon);
    const img = await getImage(city);
    console.log(cityData)
    updateCity(cityData.name, cityData.sys.country);
    updateDate(cityData.dt)
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${img.hits[getRandom(img.hits.length)].largeImageURL})`
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
    try
    {
        const pixaImg = await fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=${getPixaBayKey()}&q=${query}`,
        {
            mode: "cors"
        }
        )
    return pixaImg.json()
    }
    catch(err)
    {
        console.log(err)
    }
}