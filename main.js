"use strict";

async function getCoord(cityName, countryCode)
{
    //bad practice, but this is a free API key
    const apiKey = "0a7047fb9dfbdd373f66076c81a80a4e";

    try
    {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}
            ,${countryCode}&appid=${apiKey}`,
            {
                mode: "cors"
            }
        )

        return await response.json();
    }
    catch(err)
    {
        console.log(err);
    }
}