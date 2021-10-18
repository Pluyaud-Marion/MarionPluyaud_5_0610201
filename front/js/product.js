
async function main(){
    const idProduct = {
          id : ''
    }
    recoverId(idProduct);
    const datasProduct = await fetchDataProduct(idProduct);
    if (datasProduct===undefined){
        return
    }

    const elements = {
        descriptionElement : {},
        priceElement : {},
        imageElement : {},
        nameElement : {},
        altImageElement : {},
        colorsElement : {},
    }

    const tags = {
        tagImg : {},
        tagOptionColor : {}
    }

    let elementsCart = {
        selectedColor : '',
        selectedNumber : '',      
    }
    
    recoverElements(datasProduct, elements);
    createTag(tags);
    displayElements(elements, tags);
    colorSofa(datasProduct, elements, tags);
    //console.log(datasProduct)
    displayColorSelect(elementsCart);
    displayNumberArticle(elementsCart);
    //addCart(elements, elementsCart, idProduct, datasProduct);
    addArray(elementsCart, idProduct);
    //addLocalStorage(elementsCart);
}

main()

//fonction qui récupère l'ID du produit à afficher
function recoverId(idProduct){
    const urlProduit = window.location.search; // récupère l'id dans l'url (après le ?) = clé + valeur
    const urlSearchParams = new URLSearchParams(urlProduit);
    idProduct.id = urlSearchParams.get('id'); //récupère la clé id 
    //console.log(id)
};

// récupère les données d'un produit par son ID
function fetchDataProduct(idProduct){
    return fetch(`http://localhost:3000/api/products/${idProduct.id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log("il y a une erreur sur la page produit de type :" + e));
};

//récupère les informations sur un produit
function recoverElements(datasProduct, elements){
    elements.descriptionElement = datasProduct.description;
    elements.priceElement = datasProduct.price;
    elements.imageElement = datasProduct.imageUrl;
    elements.altImageElement = datasProduct.altTxt;
    elements.nameElement = datasProduct.name;
}
//créé les balises manquantes
function createTag(tags){
    tags.tagImg = document.createElement('img');
    document.querySelector(".item__img").appendChild(tags.tagImg);
}

//affiche sur la page les éléments récupérés via l'API
function displayElements(elements, tags){
    tags.tagImg.src = elements.imageElement;
    tags.tagImg.alt = elements.altImageElement;
    document.querySelector("#title").innerHTML = elements.nameElement; // rajouter le nom dans balise title
    document.querySelector("#price").innerHTML = elements.priceElement;
    document.querySelector("#description").innerHTML = elements.descriptionElement;
}

//spécifique pour afficher la sélection des couleurs
function colorSofa(datasProduct, elements, tags){
    elements.colorsElement = datasProduct.colors;
    for (color of elements.colorsElement){
        tags.tagOptionColor = document.createElement('option');
        document.querySelector("#colors").appendChild(tags.tagOptionColor);
        tags.tagOptionColor.value = color;
        tags.tagOptionColor.innerHTML = color;
    }
}

// au clic récupération couleur
function displayColorSelect(elementsCart){
    document.querySelector("#addToCart").addEventListener("click", event => {
        event.preventDefault();
        elementsCart.selectedColor = document.querySelector("#colors").value;
        //console.log(elementsCart.selectedColor)
    })
}

// au clic récupération value
function displayNumberArticle(elementsCart){
    document.querySelector("#addToCart").addEventListener("click", event => {
        event.preventDefault();
        elementsCart.selectedNumber = document.querySelector("#quantity").value;
        //console.log(elementsCart.selectedNumber)
    })
}

////repo vincent///
// function addArray(elementsCart, idProduct){
//     document.querySelector("#addToCart").addEventListener("click", event => {
//     event.preventDefault();

//         let array = {
//             couleur : elementsCart.selectedColor,
//             nombre : parseInt(elementsCart.selectedNumber), // transformé en number
//             identifiant : idProduct.id,
//         }

//         let stock = [];

//         if (localStorage.getItem("article") !== null){
//             stock = JSON.parse(localStorage.getItem("article"));
//             console.log("if stock", stock)
//             console.log("if array", array)
//         }else{
//             stock.push(array);
//             localStorage.setItem("article", JSON.stringify(stock));
//             console.log("else stock", stock)
//             console.log("else array", array)
//         };
//     })
// }


///fonction qui prend plusieurs objets dans le tableau
// function addArray(elementsCart, idProduct){

//     document.querySelector("#addToCart").addEventListener("click", event => {
//     event.preventDefault();
//         let array = [
//             couleur = elementsCart.selectedColor,
//             nombre = parseInt(elementsCart.selectedNumber), // transformé en number
//             identifiant = idProduct.id,
//         ]
//         //arrayNombre.push(elementsCart.selectedNumber);
//         //let reducer = (accumulator, curr) => accumulator + curr;
//         //console.log(arrayNombre.reduce(reducer));
//         //console.log(arrayNombre)

//         let stock = JSON.parse(localStorage.getItem("article"));

//         if (stock){ // si rempli
//             if (stock.includes(elementsCart.selectedColor) && stock.includes(idProduct.id)){ 
//                 console.log("produit avec même couleur même identifiant existe");

//                 localStorage.setItem("article", JSON.stringify(stock))
//                 stock[1].push(array)
                    
//             }else{
//                 stock.push(array);
//                 localStorage.setItem("article", JSON.stringify(stock))
//                 console.log("panier plein mais ce produit n'existe pas",stock)
//             }
            
//         }else{
//             stock = [],
//             stock.push(array);
//             localStorage.setItem("article", JSON.stringify(stock))
//             console.log("le panier était vide",stock)
//         }
//     })
// }


////fonction originale fonctionnait pour comptage ///
// function addArray(elementsCart, idProduct){
   
//     document.querySelector("#addToCart").addEventListener("click", event => {
//         event.preventDefault();

//         const arrayCart = [
//             couleur = elementsCart.selectedColor,
//             nombre = elementsCart.selectedNumber,
//             identifiant = idProduct.id
//         ]

//         let stockLocal = []
//         stockLocal = JSON.parse(localStorage.getItem("article")); //transforme tableau en JSON
//         console.log(stockLocal)

//         // if (arrayCart.includes(couleur) && arrayCart.includes(identifiant)) {
//         //     console.log("Ce produit est déjà dans le panier")
//         //     let numberParsed = parseInt(elementsCart.selectedNumber)
//         //     let numberAddParsed = parseInt(arrayCart[1])
//         //     let totalNumber = numberAddParsed + numberParsed
//         //     arrayCart.splice(1,1,totalNumber)
//         //     console.log(arrayCart)
            
//         //     cartLocalStorage = JSON.stringify(arrayCart)
//         //     localStorage.setItem("produit", cartLocalStorage)
            
//         // } else{
//         //     console.log("j'ajoute ce produit dans le panier")
//         //     arrayCart.push(elementsCart.selectedColor, elementsCart.selectedNumber, idProduct.id)
//         //     console.log("ajout produit", arrayCart)
    
//         //     let cartLocalStorage = JSON.stringify(arrayCart)
//         //     localStorage.setItem("produit", cartLocalStorage)
//         // }     
//     })
// }
    


