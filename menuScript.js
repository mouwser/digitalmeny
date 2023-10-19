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
          menuItem.dataset.filter = btoa( '{"price": '+JSON.stringify(item.price)+',"meat": ["'+item.type+'"], "allergenUnfriendly": '+JSON.stringify(item.allergies)+' }');
            if (item.price.length > 1) {
               menuItem.innerHTML = `
                <dish_id>${item.id}</dish_id> 
                <name>${item.name}</name>
                <halfprice>${item.price[1]}</halfprice>
                <currency>${item.currency}</currency>
                <price>${item.price[0]}</price>
                <currency>${item.currency}</currency>
                <description>${item.description}</description>
                <button class="order-button" data-dish_id="${item.id}" onclick="addToOrder('${item.name}', ${item.price[0]}, '${item.currency}')">Order</button>
                `;
              menuList.appendChild(menuItem);
            }
            else {
              menuItem.innerHTML = `
                <dish_id>${item.id}</dish_id> 
                <name>${item.name}</name>
                
                <price>${item.price[0]}</price>
                <currency>${item.currency}</currency>
                <description>${item.description}</description>
                <button class="order-button" data-dish_id="${item.id}" onclick="addToOrder('${item.name}', ${item.price[0]}, '${item.currency}')">Order</button>
                `;
              menuList.appendChild(menuItem);
            }
        });
      })
      
  }
  
  // ändra språk
  const menuContent = document.getElementById('menu-content');
  const svenskButton = document.getElementById('svensk-button');
  const engelskButton = document.getElementById('engelsk-button');
  
 
  //byter språk på menyn
  svenskButton.addEventListener('click', () => {
    currentLanguage = 'sveMeny.json';
    loadMenu(currentLanguage);
  });
  
  engelskButton.addEventListener('click', () => {
    currentLanguage = 'engMeny.json';
    loadMenu(currentLanguage);
  });
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
    document.getElementById("lowtohigh").textContent = "stigande";
    document.getElementById("hightolow").textContent = "fallande";
    document.getElementById("priceorder").textContent= "Sortera pris";
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
    document.getElementById("lowtohigh").textContent = "low to high";
    document.getElementById("hightolow").textContent = "high to low";
    document.getElementById("priceorder").textContent= "price order";
    document.getElementById("reset").textContent= "reset filter";
  }

  
 