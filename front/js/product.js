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

    recoverElements(datasProduct, elements);
    createTag(tags);
    displayElements(elements, tags);
    colorSofa(datasProduct, elements, tags);
    addArray(idProduct);
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
  //  .then(data => data)
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
function addArray(idProduct){
    document.querySelector("#addToCart").addEventListener("click", () => {
        let productChoice = {
            colorChoice : document.querySelector("#colors").value,
            numberChoice : parseInt(document.querySelector("#quantity").value),
            idChoice : idProduct.id,
        }

        let arrayCart = [];

        //si LS n'est pas vide = on récupère son contenu + on l'insère dans le tableau arrayCart + on le renvoit vers LS avec le nouveau contenu
        if (localStorage.getItem("products")) {
            arrayCart = JSON.parse(localStorage.getItem("products"));

            arrayCart.push(productChoice);

            for (elt of arrayCart) {
                //console.log(elt.colorChoice);
                //console.log(productChoice.colorChoice);

                if (elt.colorChoice == productChoice.colorChoice && elt.idChoice == productChoice.idChoice) {
                    console.log("même couleur");
                    arrayCart.pop()
                    console.log(arrayCart);
                }else{
                    arrayCart.push(productChoice);
                }
            }

            localStorage.setItem("products", JSON.stringify(arrayCart));
            console.log("panier plein")
            

        } else{ // si LS est vide on le créé avec le produit ajouté
            arrayCart.push(productChoice);
            localStorage.setItem("products", JSON.stringify(arrayCart));
            console.log("panier vide");
        }

    })
}



// function addArray(idProduct){
//     document.querySelector("#addToCart").addEventListener("click", () => {
//         let productChoice = {
//             colorChoice : document.querySelector("#colors").value,
//             numberChoice : parseInt(document.querySelector("#quantity").value),
//             idChoice : idProduct.id,
//         }

//         let arrayCart = [];

//         //si LS n'est pas vide = on récupère son contenu + on l'insère dans le tableau arrayCart + on le renvoit vers LS avec le nouveau contenu
//         if (localStorage.getItem("products")) {
//             arrayCart = JSON.parse(localStorage.getItem("products"));
//             arrayCart.push(productChoice);
//             localStorage.setItem("products", JSON.stringify(arrayCart));

//         } else{ // si LS est vide on le créé avec le produit ajouté
//             arrayCart.push(productChoice);
//             localStorage.setItem("products", JSON.stringify(arrayCart));
//         }

//     })
// }

