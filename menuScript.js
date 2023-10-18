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
          menuItem.dataset.filter = btoa( '{"price": '+JSON.stringify(item.price)+',"meat": ["'+item.type+'"], "allergenFriendly": '+JSON.stringify(item.allergies)+' }');
            if (item.price.length > 1) {
               menuItem.innerHTML = `
                <dish_id>${item.id}</dish_id> 
                <name>${item.name}</name>
                <halfprice>${item.price[1]}</halfprice>
                <currency>${item.currency}</currency>
                <price>${item.price[0]}</price>
                <currency>${item.currency}</currency>
                <button class="order-button" data-item-id="${item.name}">Order</button>
                <description>${item.description}</description>
                `;
              menuList.appendChild(menuItem);
            }
            else {
              menuItem.innerHTML = `
                <dish_id>${item.id}</dish_id> 
                <name>${item.name}</name>
                <halfprice></halfprice>
                <currency></currency>
                <price>${item.price[0]}</price>
                <currency>${item.currency}</currency>
                <button class="order-button" data-item-id="${item.name}">Order</button>
                <description>${item.description}</description>
                `;
              menuList.appendChild(menuItem);
            }
        });
      })
      
  }
  
  // ändra språk
  function changeLanguage() {
    const selectedLanguage = document.getElementById("language-select").value;
    loadMenu(selectedLanguage);
  }
  
  // lyssna på ändring av språk
  document.getElementById("svensk-button").addEventListener("click", changeLanguage);
  document.getElementById("engelsk-button").addEventListener("click",changeLanguage)
  // ladda menyn vid sidans start (svensk standard)
  loadMenu("sveMeny.json");