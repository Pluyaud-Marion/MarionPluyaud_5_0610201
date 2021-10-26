let productInStorage = JSON.parse(localStorage.getItem("products")); // récupération des éléments dans Localstorage


function main(){
    displayElements(productInStorage);
    modifyQuantity(productInStorage);
    deleteQuantity(productInStorage)
    displayTotalPrice(productInStorage);
    displayTotalQuantity(productInStorage);
}

function displayElements(productInStorage){

    //vérification si panier vide ou plein
    if (productInStorage.length == 0){
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
                        <p>Couleur : ${sofa.colorChoice}</p> 
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

function modifyQuantity(productInStorage){
    let tagQuantity = document.querySelectorAll(".itemQuantity"); // on cible les balises quantity

    //Pour chaque balise quantité
    tagQuantity.forEach(tag => {
        let newQuantity = "";
        let id = tag.closest("article").dataset.id; // récupération de l'id ds la balise article

        tag.addEventListener('change', (event) => {
            event.preventDefault();
            newQuantity = parseInt(tag.value); // la nouvelle quantité est la value de la balise quantité
       
            productInStorage.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
                if (id == sofa.idChoice){ // pour cibler le canapé
                    sofa.quantityChoice = newQuantity // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
                }
            })

        localStorage.setItem("products", JSON.stringify(productInStorage)); // on envoie le nouveau panier ds le local storage
        displayTotalPrice(productInStorage);
        displayTotalQuantity(productInStorage)
        })
    })
}

function deleteQuantity(productInStorage){
    let tagDelete = document.querySelectorAll(".deleteItem"); // on cible les balises delete
  
    tagDelete.forEach(tag => {
    
        let id = tag.closest("article").dataset.id; // récupération de l'id ds la balise article
    
        tag.addEventListener('click', (event) => {
            event.preventDefault();
       
            productInStorage.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
               
                if (id == sofa.idChoice){ // pour cibler le canapé
                    let index = productInStorage.indexOf(sofa) // récupération index du canapé
                    productInStorage.splice(index, 1); // on retire ce canapé du panier   
                }
            })

        localStorage.setItem("products", JSON.stringify(productInStorage)); // on envoie le nouveau panier ds le local storage

        window.location.reload(); // rechargement de la page
        displayTotalPrice(productInStorage);
        displayTotalQuantity(productInStorage);
        
        })
    })
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