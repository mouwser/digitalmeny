const sortSelect = document.getElementById('sort-elemenet');

sortSelect.addEventListener('change', () => {

    const selectedValue = sortSelect.value;
    let sortedDataArray = [];

    if (selectedValue === 'lowToHigh') {
        sortedDataArray = sortMenuData(window.MenuSVE, 'ASC')
    } else if (selectedValue === 'highToLow') {
        sortedDataArray = sortMenuData(window.MenuSVE, 'DESC')
    }

    displayData(sortedDataArray);
});

function displayData(data) {

    const container = document.getElementById('menu-content');
    container.innerHTML = '';

    data.sveItems.forEach(item => {

        let displayPrice = '';
        if (Array.isArray(item.price)) {
            displayPrice = item.price[0].portion + ' ' + item.price[0].value + '-' + item.price[1].portion + ' ' + item.price[1].value;
        } else {
            displayPrice = item.price;
        }
        const divColumn = `<div class="column">
                                <div class="product">
                                    <div class="title">${item.name}</div>
                                    <div class="line"></div>
                                    <div class="price">${displayPrice}</div>
                                </div>
                                <p>${item.description}</p>
                            </div>`;

        container.insertAdjacentHTML('beforeend', divColumn);
    });
}

function sortMenuData(data, sortingOption) {
    
    data.sveItems.sort((a, b) => {
        let currencyA, currencyB;

        if (Array.isArray(a.currency)) {
            currencyA = a.currency[0].value;
        } else if (typeof a.currency === 'string') {
            currencyA = parseInt(a.currency);
        } else {
            currencyA = a.currency;
        }

        if (Array.isArray(b.currency)) {
            currencyB = b.currency[0].value;
        } else if (typeof b.currency === 'string') {
            currencyB = parseInt(b.currency);
        } else {
            currencyB = b.currency;
        }

        if (sortingOption === 'ASC') { 
            return currencyA - currencyB; 
        }
        if (sortingOption === 'DESC') { 
            return currencyB - currencyA; 
        }
    });

    return data;
}

fetch('sveMeny.json')
    .then(response => response.json())
    .then(data => {
        Object.assign(window, data);
        displayData(window.MenuSVE);
    })
    .catch(error => console.error('Error fetching the JSON file:', error));