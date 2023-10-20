
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
      } else {
        menuItems = menuData.MenuENG.engItems;
      }

      // skapa HTML-element för alla rätterna i menyn, oavsett språk
      menuItems.forEach(item => {
        const menuItem = document.createElement("article");
        menuItem.dataset.dish_id = item.id;
        menuItem.dataset.filter = btoa( '{"price": '+JSON.stringify(item.price)+',"meat": ["'+item.type+'"], "allergenunfriendly": '+JSON.stringify(item.allergies)+' }');
          if (item.price.length > 1) {
             menuItem.innerHTML = `
              <dish_id>${item.id}</dish_id> 
              <name>${item.name}</name>
              <halfprice>${item.price[1]}</halfprice>
              <currency_halfprice>${item.currency}</currency_halfprice>
              <price>${item.price[0]}</price>
              <currency>${item.currency}</currency>
               <input type="radio" name="price-option-${item.id}" value="fullprice" checked>
               <label for="fullprice-radio">Full Price</label>
               <input type="radio" name="price-option-${item.id}" value="halfprice">
               <label for="halfprice-radio">Half Price</label>
              <button class="order-button" data-dish_id="${item.id}">Order</button>
              <description>${item.description}</description>
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
              <button class="order-button" data-dish_id="${item.id}">Order</button>
              <description>${item.description}</description>
              `;
            menuList.appendChild(menuItem);
          }
          const button_orders = document.querySelectorAll('.order-button');
          for( const button of button_orders ) {
              button.addEventListener("click" , addToOrder);
          }
      });
    });
}

// ändra språk
function changeLanguage() {
  const selectedLanguage = document.getElementById("language-select").value;
  loadMenu(selectedLanguage);
}

// lyssna på ändring av språk
document.getElementById("language-select").addEventListener("change", changeLanguage);

// ladda menyn vid sidans start (svensk standard)
loadMenu("sveMeny.json");