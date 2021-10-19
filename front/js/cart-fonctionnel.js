let productLS = JSON.parse(localStorage.getItem("products"));

//let tagArticle = "";
//let tagDivImg = "";
let tagImg = "";
//let tagDivContent = "";
//let tagDivContenttitlePrice = "";
let tagH2 = "";
let tagP = "";
//let tagDivContentSettings = "";
//let tagDivContentSettingsQuantity = "";
//let tagDivContentSettingsQuantityP = "";
let tagInputQuantity = "";
//let tagDivContentSettingsDelete = "";
//let tagDeleteItem = "";

async function main(){

    
    const datasProductCart = await fetchDataProductCart();
    // if (datasProductCart===undefined){
    //     return
    // }
    creatingTagsCart();
    displayElementsCart(datasProductCart);
    
}

function creatingTagsCart(){
    for (article of productLS){
        const tagArticle = document.createElement("article");
        tagArticle.classList.add("cart__item"); // ajout de classe
        tagArticle.dataset.id = article.idChoice; // injection de l'ID
        document.getElementById("cart__items").appendChild(tagArticle); // ajout tag article ds tag ID 

        const tagDivImg = document.createElement("div"); // création div img
        tagDivImg.classList.add("cart__item__img"); // ajout classe
        document.querySelector(".cart__item").appendChild(tagDivImg) // ajout div ds classe

        const tagImg = document.createElement("img");
        tagImg.alt = "Photographie d'un canapé";
        document.querySelector(".cart__item__img").appendChild(tagImg)
    

        const tagDivContent = document.createElement("div"); // création div
        tagDivContent.classList.add("cart__item__content"); // ajout classe
        document.querySelector(".cart__item").appendChild(tagDivContent) // ajout div ds classe

        const tagDivContenttitlePrice = document.createElement("div"); // création div
        tagDivContenttitlePrice.classList.add("cart__item__content__titlePrice"); // ajout classe
        document.querySelector(".cart__item__content").appendChild(tagDivContenttitlePrice) // ajout div dans classe

        const tagH2 = document.createElement("h2"); // création tag h2
        const tagP = document.createElement("p") // création tag p
        document.querySelector(".cart__item__content__titlePrice").appendChild(tagH2) // ajout tag h2 dans classe 
        tagH2.innerHTML = "Nom du produit"
        document.querySelector(".cart__item__content__titlePrice").appendChild(tagP) // ajout tag p dans classe
        tagP.innerHTML = "42,00€"

        const tagDivContentSettings = document.createElement("div"); // création tag div
        tagDivContentSettings.classList.add("cart__item__content__settings"); // ajout classe
        document.querySelector(".cart__item__content").appendChild(tagDivContentSettings) // insertion dans classe

        const tagDivContentSettingsQuantity = document.createElement("div"); // création tag div
        tagDivContentSettingsQuantity.classList.add("cart__item__content__settings__quantity"); // ajout classe
        document.querySelector(".cart__item__content__settings").appendChild(tagDivContentSettingsQuantity) // insertion dans classe

        const tagDivContentSettingsQuantityP = document.createElement("p"); // création tag p
        document.querySelector(".cart__item__content__settings__quantity").appendChild(tagDivContentSettingsQuantityP); //insertion dans classe
        tagDivContentSettingsQuantityP.innerHTML = "Qté : ";

        const tagInputQuantity = document.createElement("input")
        tagInputQuantity.classList.add("itemQuantity")
        tagInputQuantity.type = "number"
        tagInputQuantity.name = "itemQuantity"
        tagInputQuantity.min = 1
        tagInputQuantity.max = 100
        tagInputQuantity.setAttribute("value", 42)
        document.querySelector(".cart__item__content__settings__quantity").appendChild(tagInputQuantity)

        const tagDivContentSettingsDelete = document.createElement("div");
        tagDivContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        document.querySelector(".cart__item__content__settings").appendChild(tagDivContentSettingsDelete);

        const tagDeleteItem = document.createElement("p");
        tagDeleteItem.classList.add("deleteItem");
        document.querySelector(".cart__item__content__settings__delete").appendChild(tagDeleteItem);
        tagDeleteItem.innerHTML = "Supprimer";
    }
}

function fetchDataProductCart(){
    for (article of productLS){
        return fetch(`http://localhost:3000/api/products/${article.idChoice}`)
        .then(response => response.json())
        .catch(e => console.log("il y a une erreur sur la page panier de type :" + e));
    } 
};

function displayElementsCart(datasProductCart){
    for (article of productLS){
        tagImg.src = datasProductCart.imageUrl;
        tagH2.innerHTML = datasProductCart.name;
        tagP.innerHTML= datasProductCart.price + "€";
        tagInputQuantity.value = article.numberChoice;
    }
    
}

main()