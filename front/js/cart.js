let productInStorage = JSON.parse(localStorage.getItem("products")); // récupération des éléments dans Localstorage

//console.log(productInStorage);
function main(){
    displayElements(productInStorage);
    modifyCart(productInStorage);
    displayTotalPrice(productInStorage);
    displayTotalQuantity(productInStorage);
}

function displayElements(productInStorage){

    //vérification si panier vide ou plein
    if (productInStorage === null){
        document.querySelector("h1").innerHTML = "Le panier est vide"

    } else { // si panier plein = affichage des éléments
        for (sofa of productInStorage){ // pour chaque canapé dans localstorage on affiche les éléments

            let selectTagSection = document.getElementById("cart__items"); 
            //rajout de la balise color
            selectTagSection.innerHTML += `
                <article class="cart__item" data-id="${sofa.idChoice}">
                    <div class="cart__item__img">
                    <img src="${sofa.pictureChoice}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${sofa.titleChoice}</h2>
                        <p>${sofa.colorChoice}</p> 
                        <p>${sofa.priceChoice}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sofa.quantityChoice}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`
        } 
    }
}
/* Pour chaque canapé du LS on met dans le tableau vide la quantité choisie
On additionne entre elles toutes les données du tableau
On affiche dans la balise totalQuantity le résulat obtenu */
function displayTotalQuantity(productInStorage){
    
    const arrayQuantity = [];
    for (sofa of productInStorage){
        arrayQuantity.push(sofa.quantityChoice)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalQuantity = arrayQuantity.reduce(reducer)
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
    }
}
function modifyCart(productInStorage){
    let tagQuantity = document.querySelectorAll(".itemQuantity");
    let newQuantity = "";

    for (tag of tagQuantity){ // pour chaque balise dans toutes les balises
        //let id = tag.closest("article").dataset.id; // récupération de l'ID de chaque balise article
        //console.log(id);

        tag.addEventListener("change", (event) => {
            event.preventDefault;
            console.log("modification");
            
            for (product of productInStorage){ // pour chaque canapé dans le panier
                //console.log(product.quantityChoice);
            newQuantity = tag.value;
            console.log("affichage newQuantity", newQuantity);

            }
            productInStorage.push(newQuantity)
            console.log("affichage nouveau productInStorage", productInStorage);

            //quand la value change : mettre à jour productInStorage et refaire setItem
        })
    }
}

/* Pour chaque canapé du LS on récupère le prix et la quantité et on les multiplie
   on met la quantité obtenue dans le tableau vide et on additionne tous les chiffres du tableau
    on affiche ds la balise totalPrice le résultat obtenue */
function displayTotalPrice(productInStorage){
    let totalPriceQuantity = "";
    let arrayPrice = [];

    for (sofa of productInStorage){ 
        totalPriceQuantity = sofa.priceChoice * sofa.quantityChoice 
        arrayPrice.push(totalPriceQuantity)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalPrice = arrayPrice.reduce(reducer);
        document.getElementById("totalPrice").innerHTML = totalPrice
    }
}



main()