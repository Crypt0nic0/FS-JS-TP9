let countries = [];
const countriesContainer = document.querySelector('.countries-container');

fetchCountries = async () => {
    await fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => countries = data);

    displayCountries();
}

displayCountries = () => {
    countriesContainer.innerHTML = countries
        .filter((country) => country.translations.fra.common.toUpperCase().includes(inputSearch.value.toUpperCase()))
        .map((country) => {
            return `
                <div class="card">
                    <img src=${country.flags.png} alt=${country.flags.alt}>
                    <h2>${country.translations.fra.common}</h2>
                    <h3>${country.capital}</h3>
                    <p>Population : ${country.population.toLocaleString()}</p>
                </div>
            `
        })
        .slice(0, inputRange.value)
        .join('');
}

fetchCountries();

inputSearch.addEventListener('keyup', () => {
    displayCountries();
})

inputRange.addEventListener('input', (e) => {
    displayCountries();
    rangeValue.textContent = e.target.value;
})

alpha.addEventListener('click', () => {
    countries.sort((a,b) => {
        let fa = a.translations.fra.common.toLowerCase();
        let fb = b.translations.fra.common.toLowerCase();
        if(fa < fb) return -1;
        if(fa > fb) return 1;
        return 0;
    });
    displayCountries();
})

minToMax.addEventListener('click', () => {
    countries.sort((a,b) => {
        return a.population - b.population;
    })
    displayCountries();
})

maxToMin.addEventListener('click', () => {
    countries.sort((a,b) => {
        return b.population - a.population;
    })
    displayCountries();
})