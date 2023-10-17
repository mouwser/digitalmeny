// ladda och visa menyn baserat på valt språk
function loadMenu(selectedLanguage) {
  // Hämta vald menyfil (svensk eller engelsk)
  const languageFile =
    selectedLanguage === "sveMeny.json" ? "sveMeny.json" : "engMeny.json";

  //  menyn från JSON-filen
  fetch(languageFile)
    .then((res) => res.json())
    .then((menuData) => {
      const menuList = document.getElementById("menuList");
      const filters = document.getElementById("meatFilters");
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
      menuItems.forEach((item) => {
        const menuItem = document.createElement("li");
        if (Array.isArray(item.price)) {
          const priceText = item.price.map((price) => `${price.portion} ${price.value}`).join(" / ");
          menuItem.innerHTML = `
              <strong>${item.name}</strong> ${priceText}<br>
              ${item.description}<br>
              <br>`;
          } else {
            menuItem.innerHTML = `
            <strong>${item.name}</strong> ${item.price}<br>
            ${item.description}<br>
            <br>`;
        }
        menuList.appendChild(menuItem);
      });
})
}

// ändra språk
function changeLanguage() {
  const selectedLanguage = document.getElementById("languageSelect").value;
  loadMenu(selectedLanguage);
}

// lyssna på ändring av språk
document
  .getElementById("languageSelect")
  .addEventListener("change", changeLanguage);

// ladda menyn vid sidans start (svensk standard)
loadMenu("sveMeny.json");

function swedishFilter() {
  document.getElementById("filter").textContent = "Kötträtter";
  document.getElementById("vegetarian").textContent = "Vegetarisk";
  document.getElementById("beef").textContent = "Biff";
  document.getElementById("chicken").textContent = "Kyckling";
  document.getElementById("pork").textContent = "Fläsk";
  document.getElementById("fish").textContent = "Fisk";
  document.getElementById("seafood").textContent = "Skaldjur";
  document.getElementById("allergens").textContent = "Allergier";
  document.getElementById("glutenfree").textContent = "Glutenfri";
  document.getElementById("lactosfree").textContent = "Laktosfri";
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
}
