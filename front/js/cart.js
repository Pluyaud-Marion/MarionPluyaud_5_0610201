
let productInStorage = JSON.parse(localStorage.getItem("products")) || [];

/*
fonction principale de la page
*/
function main(){

    displayElements(productInStorage);
    modifyQuantity(productInStorage);
    deleteQuantity(productInStorage)
    displayTotalPrice(productInStorage);
    displayTotalQuantity(productInStorage);
   
    validateForm(productInStorage);
}

/*
On part du tableau ProductInStorage = le panier récupéré du localstorage
pour chaque canapé du tableau on affiche les éléments avec innerHTML
+ ajout balise color
*/
function displayElements (productInStorage) {
    for (let sofa of productInStorage){ 
        let selectTagSection = document.getElementById("cart__items"); 

        selectTagSection.innerHTML += `
            <article class="cart__item" data-id="${sofa.idChoice}" data-color="${sofa.colorChoice}">
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
   console.log("Les éléments du panier : ", productInStorage);
}

/* 
On part du tableau ProductInStorage = le panier récupéré du localstorage
Pour chaque balise quantity, on récupère le data-id de l'élément avec closest, et le data-color
Au "change" sur la balise on définit la nouvelle quantité (la value du tag) et on la met ds une variable
On cible le canapé sur lequel on modifie quantité avec la double condition
On donne ds productInStorage la nouvelle valeur à quantityChoice de ce canapé
On envoi le nouveau productInStorage ds LocalStorage
*/
const modifyQuantity = productInStorage =>{
    const tagQuantity = document.querySelectorAll(".itemQuantity");

    tagQuantity.forEach(tag => {
        const tagClosest = tag.closest("article");
        let newQuantity = "";
        const id = tagClosest.dataset.id; 
        const color = tagClosest.dataset.color;

        tag.addEventListener('change', event => {
            event.preventDefault();
            newQuantity = Number(tag.value); // la nouvelle quantité est la value de la balise quantité
            productInStorage.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
                
                if (sofa.idChoice === id  && sofa.colorChoice === color){ 
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
Pour chaque balise delete, on récupère l'id + la couleur de l'élément avec closest 
au click sur la balise on cible le canapé à supprimer avec la double condition
on récupère l'index ds productInStorage de ce canapé + on le supprime. 
On envoi le nouveau productInStorage ds LocalStorage
*/
const deleteQuantity = productInStorage => {
    const tagDelete = document.querySelectorAll(".deleteItem"); 
    
    tagDelete.forEach(tag => {
        const tagClosest = tag.closest("article");
        const id = tagClosest.dataset.id; 
        const article = tagClosest;
        const color = tagClosest.dataset.color;
    
        tag.addEventListener('click', event => {
            event.preventDefault();
            productInStorage.forEach(sofa => {
                if (sofa.idChoice === id && sofa.colorChoice === color){ 
                    let index = productInStorage.indexOf(sofa) // récupération index du canapé
                    if(confirm("Voulez vous supprimer cet article de votre panier?")){
                        article.remove(); // supprime du DOM
                        productInStorage.splice(index, 1); // on retire ce canapé du panier
                    }
                }
            })

        localStorage.setItem("products", JSON.stringify(productInStorage)); 

        displayTotalPrice(productInStorage);
        displayTotalQuantity(productInStorage);        
        })
    })
}

/* 
Pour chaque canapé du LS on met dans le tableau vide la quantité choisie
On additionne entre elles toutes les données du tableau
On affiche dans la balise totalQuantity le résulat obtenu 
*/
function displayTotalQuantity(productInStorage){
    
    const arrayQuantity = [];
    for (let sofa of productInStorage){
        arrayQuantity.push(sofa.quantityChoice)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalQuantity = arrayQuantity.reduce(reducer)
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
        
    }

    if(arrayQuantity.length === 0){
        document.querySelector("h1").innerHTML = "Le panier est vide";
        totalQuantity = "";
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
    }
}

/* 
Pour chaque canapé du LS on récupère le prix et la quantité et on les multiplie
on met la quantité obtenue dans le tableau vide et on additionne tous les chiffres du tableau
on affiche ds la balise totalPrice le résultat obtenu
*/
function displayTotalPrice(productInStorage){
    let totalPriceQuantity = "";
    let arrayPrice = [];

    for (let sofa of productInStorage){ 
        totalPriceQuantity = sofa.priceChoice * sofa.quantityChoice 
        arrayPrice.push(totalPriceQuantity)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalPrice = arrayPrice.reduce(reducer);
        document.getElementById("totalPrice").innerHTML = totalPrice
    }
    if(arrayPrice.length === 0){
        totalPriceQuantity = "";
        document.getElementById("totalPrice").innerHTML = totalPriceQuantity;
    }
}

/* 
Fonction va envoyer le formulaire à l'API avec les éléments : 
-> products = un tableau qui contient les ID
-> contact = un objet qui contient les données du formulaires vérifiées
*/
function sendForm(productInStorage, contact){
    let products = [];

    for (let sofa of productInStorage){
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
}

/* 
Au clic : 
Récupère les valeurs des champs des formulaires
Appelle la fonction verifyForm avec les bons paramètres pour vérifier chaque champ et afficher les messsages d'erreur
Créé un objet contact avec les values du formulaire
Appelle la fonction d'envoi du formulaire si la  vérification est ok et si panier non vide
*/
function validateForm(productInStorage){
    const buttonValidate = document.getElementById("order");

    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    const emailErrorMsg = document.getElementById("emailErrorMsg");

    const regexNameCity = /^[a-zA-ZÀ-ÿ_-]{2,60}$/
    const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
    const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;

    buttonValidate.addEventListener('click', event => {
        event.preventDefault();
        prenom = document.querySelector('#firstName').value;
        nom = document.querySelector('#lastName').value;
        adresse = document.querySelector('#address').value;
        ville = document.querySelector('#city').value;
        mail = document.querySelector('#email').value;

        verifyForm(prenom, firstNameErrorMsg, regexNameCity);
        verifyForm(nom, lastNameErrorMsg, regexNameCity);
        verifyForm(adresse, addressErrorMsg, regexAddress);
        verifyForm(ville, cityErrorMsg, regexNameCity);
        verifyForm(mail, emailErrorMsg, regexEmail)

        const contact = {
            firstName : prenom,
            lastName : nom,
            address : adresse,
            city : ville,
            email : mail,
        }
        //si le formulaire est valide + que le panier n'est pas vide -> appel de la fonction sendForm
        if (verifyForm(prenom, firstNameErrorMsg, regexNameCity) && verifyForm(nom, lastNameErrorMsg, regexNameCity) && verifyForm(adresse, addressErrorMsg, regexAddress) && verifyForm(ville, cityErrorMsg, regexNameCity) && verifyForm(mail, emailErrorMsg, regexEmail) && productInStorage.length >= 1) {
            sendForm(productInStorage, contact);
        }else{
            console.log("le formulaire n'est pas conforme");
            alert("Il y a une erreur sur la page. Votre commande n'est pas validée")
        }
    })
}

/*
Fonction qu'on appellera pour chaque champ du formulaire pour vérifier le champ 
*/
function verifyForm(elementContact, elementError, elementRegex){
    if(elementContact.length === 0){ // si le champ de l'input est vide
        elementError.innerHTML = "Veuillez renseigner ce champ";
        return false
    } else if (!elementRegex.test(elementContact)){ // si champ rempli mais regex non valide
        elementError.innerHTML = "Format incorrect";
        return false
    } else{ // champ ok
        elementError.innerHTML = "";
        return true
    }
}

main()