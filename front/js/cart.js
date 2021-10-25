

let productLS = JSON.parse(localStorage.getItem("products"));

let quantity = "";
let totalPriceQuantity = "";
let arrayQuantity = [];
let arrayPrice = [];


function addElementsCart(){
    for (sofa of productLS){ // pour chaque canapé mis dans le panier LS
    
        let selectTagSection = document.getElementById("cart__items");    
        quantity = sofa.quantityChoice; // quantité d'un canapé choisie par l'utilisateur
        //console.log("sofa.quantityChoice",sofa.quantityChoice);

        //console.log("quantity", quantity);


        fetch(`http://localhost:3000/api/products/${sofa.idChoice}`)
        .then(response => response.json())
        .then(data => {
          
        selectTagSection.innerHTML += 
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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`
        
        totalPriceQuantity = data.price * quantity
        arrayPrice.push(totalPriceQuantity)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalPrice = arrayPrice.reduce(reducer);
        document.getElementById("totalPrice").innerHTML = totalPrice

        })
        //console.log("hors du fetch",sofa.quantityChoice);
        
        arrayQuantity.push(quantity)       
    }
}


function displayTotalQuantity(){
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const totalQuantity = arrayQuantity.reduce(reducer)
    document.getElementById("totalQuantity").innerHTML = totalQuantity
}

addElementsCart()
displayTotalQuantity()

