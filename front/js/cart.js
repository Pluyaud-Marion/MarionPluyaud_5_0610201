let productLS = JSON.parse(localStorage.getItem("products"));

let selectSection = document.getElementById("cart__items");
for (sofa of productLS){

    fetch(`http://localhost:3000/api/products/${sofa.idChoice}`)
    .then(response => response.json())
    .then(data => {
       
       selectSection.innerHTML += 
    `<article class="cart__item" data-id="${sofa.idChoice}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${data.name}</h2>
        <p>${data.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sofa.numberChoice}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
    })
}

// for (article of productLS) {    
//     const tagArticle = document.createElement("article");
//     tagArticle.classList.add("cart__item"); // ajout de classe
//     tagArticle.dataset.id = article.idChoice; // injection de l'ID
//     document.getElementById("cart__items").appendChild(tagArticle); // ajout tag article ds tag ID 
// }

// const allTagArticle = document.querySelectorAll(".cart__item"); // récupération de toutes les balises articles

// for (tagArticle of allTagArticle){ // pour chaque balise article on créé une div cart__item__img + une div cart__item__content
//     const tagDivImg = document.createElement("div"); // création div img
//     tagDivImg.classList.add("cart__item__img"); // ajout classe
//     tagArticle.appendChild(tagDivImg) // ajout divImg ds chaque .cart__item

//     const tagDivContent = document.createElement("div");
//     tagDivContent.classList.add("cart__item__content");
//     tagArticle.appendChild(tagDivContent);
// }

// const allTagDivImg = document.querySelectorAll(".cart__item__img"); // récupération de toutes les balises div img


// for (divImg of allTagDivImg){ // pour chaque balise div cart__item__img on créé une img
//     tagImg = document.createElement("img");
//     tagImg.alt = "Photographie d'un canapé";
//     divImg.appendChild(tagImg); // ajout tagImg dans chaque .cart__item__img
// }

// const allTagDivContent = document.querySelectorAll(".cart__item__content"); // récupération de toutes les balises div cart__item__content

// for (divContent of allTagDivContent){ // pour chaque balise div cart__item__content
//     const tagDivContent = document.createElement("div"); // création balise div cart__item__content__titlePrice
//     tagDivContent.classList.add("cart__item__content__titlePrice");
//     divContent.appendChild(tagDivContent);

//     const tagDivContentSettings = document.createElement("div");
//     tagDivContentSettings.classList.add("cart__item__content__settings");
//     divContent.appendChild(tagDivContentSettings);
// }

// const allTagDivContentTitlePrice = document.querySelectorAll(".cart__item__content__titlePrice");

// for (divContentTitlePrice of allTagDivContentTitlePrice){
//     tagH2 = document.createElement("h2");
//     tagH2.innerHTML = "Nom du produit";
//     divContentTitlePrice.appendChild(tagH2);
//     const tagP = document.createElement("p");
//     //tagP.innerHTML = "42,00€";
//     divContentTitlePrice.appendChild(tagP);
// }

// const allTagDivContentSettings= document.querySelectorAll(".cart__item__content__settings");

// for(divContentSettings of allTagDivContentSettings){
//     const tagDivContentSettingsQuantity = document.createElement("div");
//     tagDivContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
//     divContentSettings.appendChild(tagDivContentSettingsQuantity);

//     const tagDivContentSettingsDelete = document.createElement("div");
//     tagDivContentSettingsDelete.classList.add("cart__item__content__settings__delete");
//     divContentSettings.appendChild(tagDivContentSettingsDelete);
// }

// const allTagDivContentSettingsQuantity = document.querySelectorAll(".cart__item__content__settings__quantity");

// for (divContentSettingsQuantity of allTagDivContentSettingsQuantity){
//     const tagDivContentSettingsQuantityP = document.createElement("p");
//     tagDivContentSettingsQuantityP.innerHTML = "Qté : ";
//     divContentSettingsQuantity.appendChild(tagDivContentSettingsQuantityP);

//     tagInputQuantity = document.createElement("input");
//     tagInputQuantity.classList.add("itemQuantity")
//     tagInputQuantity.type = "number"
//     tagInputQuantity.name = "itemQuantity"
//     tagInputQuantity.min = 1
//     tagInputQuantity.max = 100
//     //tagInputQuantity.setAttribute("value", 42)
//     divContentSettingsQuantity.appendChild(tagInputQuantity);
// }

// const allDivContentSettingsDelete = document.querySelectorAll(".cart__item__content__settings__delete");    

// for (divContentSettingsDelete of allDivContentSettingsDelete){
//     const tagDeleteItem = document.createElement("p");
//     tagDeleteItem.classList.add("deleteItem");
//     tagDeleteItem.innerHTML = "Supprimer";
//     divContentSettingsDelete.appendChild(tagDeleteItem)
// }
// //for (article of productLS) {   
//     // fetch(`http://localhost:3000/api/products/${article.idChoice}`)
//     // .then(response => response.json())
//     // .then (data => {

//         // tagH2.innerHTML = data.name;
//         // tagP.innerHTML = data.price + "€";
//         //tagP.textContent = data.price + "€";
//     //})

//     //tagInputQuantity.value = article.numberChoice;
  
// //}
// productLS.forEach(sofa => {
//     fetch(`http://localhost:3000/api/products/${sofa.idChoice}`)
//     .then(response => response.json())
//     .then(data => {
//          tagImg.src = data.imageUrl
//     })
       
// })

