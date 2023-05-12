let countries = [];
const countryContainer = document.querySelector(".countries-container");

async function fetchCountries() {
    await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => (countries = data));

    countriesDisplay("", rangeValue.textContent);
}

function countriesDisplay(search, nbAff){
    countryContainer.innerHTML = countries
    .map((country) => {
        const countryNameUp = country.name.common.toUpperCase();
        if(countryNameUp.includes(search))
        {
            return `
                <img src=${country.flags.png} alt=${country.flags.alt}>
                <h2>${country.name.common}</h2>
                <h3>${country.capital}</h3>
                <p>${country.population}</p>
            `
        }
    })
    .join("");
}

fetchCountries();



inputSearch.addEventListener("keyup", (e) => {
    countriesDisplay(e.target.value.toUpperCase(), rangeValue.textContent);
});

inputRange.addEventListener("input", (e) => {
    rangeValue.textContent = e.target.value;
    countriesDisplay(inputSearch.value.toUpperCase(), rangeValue.textContent);
});

// 4 - Créer une fonction d'affichage, 
//et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
