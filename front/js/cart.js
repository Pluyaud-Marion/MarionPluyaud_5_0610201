let productInStorage = JSON.parse(localStorage.getItem("products")); // récupération des éléments dans Localstorage

/*
fonction principale de la page
*/
function main(){
    displayElements(productInStorage);
    modifyQuantity(productInStorage);
    deleteQuantity(productInStorage)
    displayTotalPrice(productInStorage);
    displayTotalQuantity(productInStorage);
    sendForm(productInStorage);
}

/*
On part du tableau ProductInStorage = le panier récupéré du localstorage
Si tableau vide : on modifie balise h1 pour indiquer panier vide
Si tableau plein : pour chaque canapé du tableau on affiche les éléments avec innerHTML
+ ajout balise color
*/
function displayElements(productInStorage){
    if (productInStorage.length == 0){
        document.querySelector("h1").innerHTML = "Le panier est vide"
    } else { 
        for (sofa of productInStorage){ 
            let selectTagSection = document.getElementById("cart__items"); 

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

/* 
On part du tableau ProductInStorage = le panier récupéré du localstorage
Pour chaque balise quantity, on récupère l'id de l'élément avec closest,
Au "change" sur la balise on définit la nouvelle quantité (la value du tag) et on la met ds une variable
On cible le canapé sur lequel on modifie quantité avec la condition
On donne ds productInStorage la nouvelle valeur à quantityChoice de ce canapé
On envoi le nouveau productInStorage ds LocalStorage
*/
function modifyQuantity(productInStorage){
    let tagQuantity = document.querySelectorAll(".itemQuantity");
    tagQuantity.forEach(tag => {
        let newQuantity = "";
        let id = tag.closest("article").dataset.id; 

        tag.addEventListener('change', (event) => {
            event.preventDefault();
            newQuantity = parseInt(tag.value); // la nouvelle quantité est la value de la balise quantité
       
            productInStorage.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
                if (id == sofa.idChoice){ 
                    sofa.quantityChoice = newQuantity // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
                }
            })

        localStorage.setItem("products", JSON.stringify(productInStorage)); 
        displayTotalPrice(productInStorage);
        displayTotalQuantity(productInStorage)
        })
    })
}

/* 
On part du tableau ProductInStorage = le panier récupéré du localstorage
Pour chaque balise delete, on récupère l'id de l'élément avec closest,
au click sur la balise on cible le canapé à supprimer avec la condition
on récupère l'index ds productInStorage de ce canapé + on le supprime. 
On envoi le nouveau productInStorage ds LocalStorage
*/
function deleteQuantity(productInStorage){
    let tagDelete = document.querySelectorAll(".deleteItem"); 
    tagDelete.forEach(tag => {
        let id = tag.closest("article").dataset.id; 
    
        tag.addEventListener('click', (event) => {
            event.preventDefault();
       
            productInStorage.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
                if (id == sofa.idChoice){ 
                    let index = productInStorage.indexOf(sofa) // récupération index du canapé
                    productInStorage.splice(index, 1); // on retire ce canapé du panier   
                }
            })

        localStorage.setItem("products", JSON.stringify(productInStorage)); 

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

function sendForm(productInStorage){
    const buttonValidate = document.getElementById("order");
    
    buttonValidate.addEventListener('click', (event) => {
       event.preventDefault();
        const contact = {
            firstName : "",
            lastName : "",
            address : "",
            city : "", 
            email : ""
        }

        let products = [];
        contact.firstName = document.querySelector('#firstName').value;
        contact.lastName = document.querySelector('#lastName').value;
        contact.address = document.querySelector('#address').value;
        contact.city = document.querySelector('#city').value;
        contact.email = document.querySelector('#email').value;
    
        for (sofa of productInStorage){
            let productId = sofa.idChoice;
            products.push(productId)
        }
       
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({contact, products}), 
        })
        .then(response => response.json())
        .then(data => {
            window.location = `confirmation.html?orderId=${data.orderId}` // redirection vers page confirmation
        })
        .catch(e => console.log("il y a une erreur sur la page cart de type :" + e));  
    })
}

main()