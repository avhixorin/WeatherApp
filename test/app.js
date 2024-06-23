const handleChange = (e) => {
    console.log(e.target.value);  // Logs the value of the input field to the console
};

const handleSubmit = (event) => {
    event.preventDefault();  // Prevent the form from submitting
    const query = document.getElementById('default-search').value;
    searchCities(query);
};

const searchCities = async (query) => {
    const username = 'avhi5497'; // Replace with your GeoNames username
    const url = `http://api.geonames.org/searchJSON?formatted=true&q=${encodeURIComponent(query)}&maxRows=1000&featureClass=P&username=${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const cities = data.geonames.map(geoname => geoname.name);
        displayResults(cities);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayResults = (cities) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (cities.length === 0) {
        resultsDiv.innerHTML = '<p>No cities found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('list-disc', 'pl-5');
    cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        ul.appendChild(li);
    });

    resultsDiv.appendChild(ul);
};

const clearResults = () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
};
