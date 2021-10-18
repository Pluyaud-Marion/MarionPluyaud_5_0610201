
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


// function addArray(elementsCart, idProduct){
//     document.querySelector("#addToCart").addEventListener("click", event => {
//         event.preventDefault();
//         let productChoice = {
//             couleur : elementsCart.selectedColor,
//             nombre : elementsCart.selectedNumber,
//             identifiant : idProduct.id
//         }

//         //converti les données de la variable produitDansStorage au format JSON
//         let produitDansStorage = JSON.parse(localStorage.getItem("produit"));
    
//         if (produitDansStorage) { //si y a des produits dans local
//             produitDansStorage.push(productChoice); // on met dans ce tableau le contenu de la variable productChoice
//             localStorage.setItem("produit", JSON.stringify(produitDansStorage));
//             console.log("il y avait déjà des produits dans storage, j'ajoute : ", produitDansStorage)
//             console.log(produitDansStorage)

//         }else { // si pas de produits dans localstorage
//             produitDansStorage = [] // tableau vide car localstorage est vide
//             produitDansStorage.push(productChoice); // on met dans ce tableau le contenu de la variable productChoice
//             localStorage.setItem("produit", JSON.stringify(produitDansStorage));
//             console.log("le panier était vide", produitDansStorage)
//             console.log(produitDansStorage);
//         }
//     })
// }

function addArray(elementsCart, idProduct){
    document.querySelector("#addToCart").addEventListener("click", event => {
        event.preventDefault();
        let productChoice = {
            couleur : elementsCart.selectedColor,
            nombre : parseInt(elementsCart.selectedNumber),
            identifiant : idProduct.id
        }

        //converti les données de la variable produitDansStorage au format JSON
        let produitDansStorage = JSON.parse(localStorage.getItem("produit"));
    
      
        if (produitDansStorage) { // si panier plein
        
            
            //vérifier si produit avec même identfiant + même couleur existe 

                //si OUI : changer que nombre = ancien nombre + nouveau nombre

                //si NON = on ajoute le produit (push nouveau productChoice dans produitDansStorage)
            produitDansStorage.push(productChoice); // on met dans ce tableau le contenu de la variable productChoice
            localStorage.setItem("produit", JSON.stringify(produitDansStorage));
            console.log("il y avait déjà des produits dans storage, j'ajoute : ", produitDansStorage)
       

        }else { // si pas de produits dans localstorage
            produitDansStorage = [] // tableau vide car localstorage est vide
            produitDansStorage.push(productChoice); // on met dans ce tableau le contenu de la variable productChoice
            localStorage.setItem("produit", JSON.stringify(produitDansStorage));
            console.log("le panier était vide", produitDansStorage)
            console.log(produitDansStorage);
        }
       
  
    })
}