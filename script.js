
/*hämtar alla element med klassen column och lagrar dem i products*/
const products = document.querySelectorAll('.column');

/*hämtar id sort-element och lagrar det i sortselect*/
const sortSelect = document.getElementById('sort-elemenet');



sortSelect.addEventListener('change', () => {
    const selectedValue = sortSelect.value;
    if (selectedValue === 'lowToHigh') {
        const sortedProducts = Array.from(products).sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent);
            const priceB = parseFloat(b.querySelector('.price').textContent);
            return priceA - priceB;
        });
        sortedProducts.forEach((product) => document.querySelector('.menu-content').appendChild(product));
    } else if (selectedValue === 'highToLow') {
        const sortedProducts = Array.from(products).sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent);
            const priceB = parseFloat(b.querySelector('.price').textContent);
            return priceB - priceA;
        });
        sortedProducts.forEach((product) => document.querySelector('.menu-content').appendChild(product));
    }
});



