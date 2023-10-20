
// ladda och visa menyn baserat på valt språk
function loadMenu(selectedLanguage) {
  // Hämta vald menyfil (svensk eller engelsk)
  const languageFile = selectedLanguage === "sveMeny.json" ? "sveMeny.json" : "engMeny.json";

  //  menyn från JSON-filen
  fetch(languageFile)
    .then(res => res.json())
    .then(menuData => {
      const menuList = document.getElementById("menu-list");
      menuList.innerHTML = ""; // rensa nuvarande meny

      let menuItems = [];

      if (selectedLanguage === "sveMeny.json") {
        menuItems = menuData.MenuSVE.sveItems;
        swedishFilter();
      } else {
        menuItems = menuData.MenuENG.engItems;
        englishFilter();
      }

      // skapa HTML-element för alla rätterna i menyn, oavsett språk
      menuItems.forEach(item => {
        const menuItem = document.createElement("article");
        menuItem.dataset.dish_id = item.id;
        menuItem.dataset.filter = btoa('{"price": ' + JSON.stringify(item.price) + ',"meat": ["' + item.type + '"], "allergenunfriendly": ' + JSON.stringify(item.allergies) + ' }');
        if (item.price.length > 1) {
          menuItem.innerHTML = `
              <dish_id>${item.id}</dish_id> 
              <name>${item.name}</name><br>
              <input type="radio" title="halfprice-radio" name="price-option-${item.id}" value="halfprice">
              <label for="halfprice-radio">Half Price</label>
              <halfprice>${item.price[1]}</halfprice>
              <currency_halfprice>${item.currency}</currency_halfprice>
              <input type="radio" title="fullprice-radio" name="price-option-${item.id}" value="fullprice" checked>
              <label for="fullprice-radio">Full Price</label>
              <price>${item.price[0]}</price>
              <currency>${item.currency}</currency> 
              <description>${item.description}</description>
              <button class="order-button" data-dish_id="${item.id}">Order</button>
              
              `;
          menuList.appendChild(menuItem);
        }
        else {
          menuItem.innerHTML = `
              <dish_id>${item.id}</dish_id> 
              <name>${item.name}</name>
              <halfprice></halfprice>
              <currency_halfprice></currency_halfprice>
              <price>${item.price[0]}</price>
              <currency>${item.currency}</currency>
              <description>${item.description}</description>
              <button class="order-button" data-dish_id="${item.id}">Order</button>

              `;
          menuList.appendChild(menuItem);
        }
        const button_orders = document.querySelectorAll('.order-button');
        for (const button of button_orders) {
          button.addEventListener("click", addToOrder);
        }
      });
    });
}
// ändra språk
const menuContent = document.getElementById("menu-content");
const svenskButton = document.getElementById("svensk-button");
const engelskButton = document.getElementById("engelsk-button");

//byter språk på menyn
svenskButton.addEventListener("click", () => {
  currentLanguage = "sveMeny.json";
  loadMenu(currentLanguage);
});

engelskButton.addEventListener("click", () => {
  currentLanguage = "engMeny.json";
  loadMenu(currentLanguage);
});
// ändra språk
function changeLanguage() {
  const selectedLanguage = document.getElementById("language-select").value;
  loadMenu(selectedLanguage);
}



// ladda menyn vid sidans start (svensk standard)
loadMenu("sveMeny.json");

function swedishFilter() {
  document.getElementById("filter").textContent = "Kötträtter";
  document.getElementById("vegetarian").textContent = "Vegetarisk";
  document.getElementById("beef").textContent = "Nötkött";
  document.getElementById("chicken").textContent = "Kyckling";
  document.getElementById("pork").textContent = "Fläsk";
  document.getElementById("fish").textContent = "Fisk";
  document.getElementById("seafood").textContent = "Skaldjur";
  document.getElementById("allergens").textContent = "Allergier";
  document.getElementById("glutenfree").textContent = "Glutenfri";
  document.getElementById("lactosfree").textContent = "Laktosfri";
  document.getElementById("lowtohigh").textContent = "Stigande";
  document.getElementById("hightolow").textContent = "Fallande";
  document.getElementById("reset").textContent = "Återställ filter";

  /*document.getElementById("priceorder").textContent= "Sortera pris";*/
}

function englishFilter() {
  document.getElementById("filter").textContent = "Meat Dishes";
  document.getElementById("vegetarian").textContent = "Vegetarian";
  document.getElementById("beef").textContent = "Beef";
  document.getElementById("chicken").textContent = "Chicken";
  document.getElementById("pork").textContent = "Pork";
  document.getElementById("fish").textContent = "Fish";
  document.getElementById("seafood").textContent = "Seafood";
  document.getElementById("allergens").textContent = "Allergies";
  document.getElementById("glutenfree").textContent = "Gluten free";
  document.getElementById("lactosfree").textContent = "Lactose free";
  document.getElementById("lowtohigh").textContent = "Low to high";
  document.getElementById("hightolow").textContent = "High to low";
  /*document.getElementById("priceorder").textContent= "price order";*/
  document.getElementById("reset").textContent = "Reset filter";
}


function resetFilters() {
  //  alla checkboxes i  Filters section
  const checkboxes = document.querySelectorAll(
    '.filters input[type="checkbox"]'
  );

  // Loopar genom varje checkbox och sätter värdet till false
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
    filterMenu();
  });
  // Återställ prisortering till standard
  const sortSelect = document.getElementById("sort-element");
  sortSelect.value = "standard";
}