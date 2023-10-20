// Funktion för att filtrera menyobjekt baserat på användarens val

function filterMenu() {
 
  // Hämta alla menyobjekt med klassen "article"
 const menuList = document.getElementById("menu-list");
 const menuItems = Array.from(menuList.getElementsByTagName("article"));
   
  // Dölj alla menyobjekt initialt
  menuItems.forEach(function (menuItem) {
    menuItem.classList.add('hidden');
  });
  
  // Iterera genom varje menyobjekt
  menuItems.forEach(function (menuItem) {
       
    // Hämta valda kött- och allergifilter
    const meatFilters = document.querySelectorAll('.meatFilters input');
    const allergyFilters = document.querySelectorAll('.allergyFilters input');
    
    // Array för att lagra valda värden för köttfilter
    let meat_array = [];

    // Iterera genom köttfilter och lagra valda värden
    for( const input of meatFilters )
    {
      if( input.checked )
      {
        meat_array.push( input.dataset.filter );
      }
    }
  
    // Array för att lagra valda värden för allergifilter
    let allergendishes_array = [];

    // Iterera genom allergifilter och lagra valda värden
    for( const input of allergyFilters )
    {
      if( input.checked )
      {
        allergendishes_array.push( input.dataset.filter );
      }
    }
       
    // Om inga filter är valda, visa menyobjektet
    if( meat_array.length === 0 && allergendishes_array.length === 0)
    {
      menuItem.classList.remove("hidden");
      return;
    }
   
    // Om endast allergifilter är valda
    if( meat_array.length === 0 && allergendishes_array.length !== 0)
    {
      //skapar const rawFilter och hämtar data-filter från dish under article i base64 format 
      const rawFilter = menuItem.dataset.filter;
      // skapar const stringFilter och avkodar rawFilter från base64 till en textsträng
      const stringFilter =atob(rawFilter);
      //skapar const filter som parsas i JSON från stringFilter
      const filter = JSON.parse(stringFilter);
  
      // Kontrollera om menyobjektet är allergivänligt och visa/dölj därefter
      for( const allergen of allergendishes_array )
      {
        if( filter.allergenunfriendly.includes( allergen ) )
        {
          return;
        }
      }
      menuItem.classList.remove("hidden");
      
      return;
    }
    
    //skapar const rawFilter och hämtar data-filter från dish under article i base64 format 
    const rawFilter= menuItem.dataset.filter;
    // skapar const stringFilter och avkodar rawFilter från base64 till en textsträng
    const stringFilter =atob(rawFilter);
    //skapar const filter som parsas i JSON från stringFilter
    const filter = JSON.parse( stringFilter );
   
    // Kontrollera köttfilter och visa rätter med den typen av kött
   filter.meat.forEach( function( meat ) {
     if( meat_array.includes( meat ) )
    {
      menuItem.classList.remove("hidden");
    }
   });
       
   // Kontrollera allergifilter och visa rätter med den typen av allergi
   allergendishes_array.forEach( function( allergenFree ) {
     if( filter.allergenunfriendly.includes( allergenFree ) )
    {
      menuItem.classList.add("hidden");
      return;
    }
   });
    

  });
}

// Händelselyssnare för att utlösa filtrering när DOM är helt laddad
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = Array.from(document.getElementsByClassName("dish"));

  // Händelselyssnare för ändringar i filterinmatningar

  const filter_inputs = document.querySelectorAll('.filters input');
  for( const input of filter_inputs ) {
      input.addEventListener("change" , filterMenu);
  }
});


// Funktion för att återställa filters
function resetFilters() {
//  alla checkboxes i  Filters section
const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');

// Loopar genom varje checkbox och sätter värdet till false
checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
    filterMenu();
});
    // Återställ prisortering till standard
    const sortSelect = document.getElementById('sort-element');
    sortSelect.value = 'standard';
}




//Prissortering
  const sortSelect = document.getElementById('sort-element');
  sortSelect.value = 'standard';
  sortSelect.addEventListener('change', () => {
  /*hämtar alla element med id menu-list och lagrar dem i products*/
  const products = document.querySelectorAll('#menu-list article');
  /*hämtar id sort-element och lagrar det i sortselect*/
  const selectedValue = sortSelect.value;
  if (selectedValue === 'lowToHigh') {
      const sortedProducts = Array.from(products).sort((a, b) => {
          const priceA = parseFloat(a.querySelector('price').textContent);
          const priceB = parseFloat(b.querySelector('price').textContent);
          return priceA - priceB;
      });
      sortedProducts.forEach((product) => document.querySelector('#menu-list').appendChild(product));
  } else if (selectedValue === 'highToLow') {
      const sortedProducts = Array.from(products).sort((a, b) => {
          const priceA = parseFloat(a.querySelector('price').textContent);
          const priceB = parseFloat(b.querySelector('price').textContent);
          return priceB - priceA;
      });
      sortedProducts.forEach((product) => document.querySelector('#menu-list').appendChild(product));
  }
  else if (selectedValue === 'standard') {
    const sortedProducts = Array.from(products).sort((a, b) => {
        const priceA = parseFloat(a.querySelector('dish_id').textContent);
        const priceB = parseFloat(b.querySelector('dish_id').textContent);
        return priceA - priceB;
    });
    sortedProducts.forEach((product) => document.querySelector('#menu-list').appendChild(product));
}
});

// array för kundvagn som laddas från localStorage
const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
// Funktion för att spara kundvagnen till localStorage
function saveToLocalStorage() {
  localStorage.setItem('orderItems', JSON.stringify(orderItems));
}
// funktion för att lägga till rätt och pris till kundvagn
function addToOrder() {
  let dish = document.querySelector (`[data-dish_id="${this.dataset.dish_id}"`);
  let dishName = dish.querySelector("name").innerHTML;
  let currency = dish.querySelector("currency").innerHTML;
  let radioPrice = dish.querySelector(`[value="halfprice"]`);
  console.log(currency);
  let price = Number(dish.querySelector("price").innerHTML);
  let isfullsize = true;
  if (radioPrice!=undefined)
  {
    if (radioPrice.checked) 
    {
      price = Number(dish.querySelector("halfprice").innerHTML);
      currency = dish.querySelector("currency_halfprice").innerHTML;
      isfullsize = false;
    }
  }
  orderItems.push({ name: dishName, price: price, currency: currency, isfullsize: isfullsize });

  updateOrderDisplay();
  saveToLocalStorage();
}


// funktion som uppdaterar kundvagn
function updateOrderDisplay() {
  const orderDiv = document.getElementById("order-div");
  orderDiv.innerHTML = ""; 

  let totalPrice = 0;

  orderItems.forEach((item, index) => {
    const orderItem = document.createElement("div");
    orderItem.textContent = `${item.name}: ${item.price} ${item.currency}`;
    if (item.isfullsize==false) {
      orderItem.textContent = `${item.name}: ${item.price} ${item.currency} (half)`;
    }

    // skapar en removeButton som tar bort maträtten från kundvagnen om den klickas
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.style.color = "red";
    removeButton.addEventListener("click", () => removeItem(index));

    orderItem.appendChild(removeButton);
    orderDiv.appendChild(orderItem);

    totalPrice += item.price;
  });

  // visar det totala priset
  const totalDiv = document.createElement("div");
  totalDiv.textContent = `Total: ${totalPrice} ${orderItems.length > 0 ? orderItems[0].currency : 'SEK'}`;
  orderDiv.appendChild(totalDiv);
  //skapar en beställningsknapp när en maträtt läggs till
  if (orderItems.length > 0) {
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Beställ";
    checkoutButton.addEventListener("click", openCheckoutPage);
    orderDiv.appendChild(checkoutButton);
  }
}
// funktion för att lägga beställning
function openCheckoutPage() {
  // skapar en variabel för totalpriset för beställningen
  const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);

  // skapar en array av beställningsinformationen
  const orderDetails = {
    items: orderItems.map(item => ({
      name: item.name,
      price: item.price,
      currency: item.currency,
      isfullsize: item.isfullsize,
    })),
    total: totalPrice,
  };

  // beställningsinformationen omvandlas till en JSON string som skickas som en query parameter
  const orderDetailsJSON = encodeURIComponent(JSON.stringify(orderDetails));

  // specificerar URL till kundvagnens html sida med query parametern 
  const kundvagnPageURL = `kundvagn.html?order=${orderDetailsJSON}`;

  // hänvisar till kundvagn.html sidan
  window.location.href = kundvagnPageURL;
  // rensar kundvagnen i localstorage
  localStorage.removeItem('orderItems');

}
function removeItem(index) {
  // kollar att index är giltig
  if (index >= 0 && index < orderItems.length) {
    // tar bort item i index
    orderItems.splice(index, 1);
    // uppdaterar display 
    updateOrderDisplay();
    // sparar ändringar i localstorage
    saveToLocalStorage();
  }
}
// Sparar kundvagnen i localStorage
function saveToLocalStorage() {
  localStorage.setItem('orderItems', JSON.stringify(orderItems));
}

updateOrderDisplay();




