let id = "";
let descriptionElement = "";
let priceElement = "";
let imageElement = "";
let nameElement = "";
let altImageElement = "";
let tagImg = "";
let tagOptionColor = "";
let colorsElement = "";




async function main(){
    recoverId();
    let datasProduct = await fetchDataProduct();

    recoverElements(datasProduct);
    createTag();
    displayElements();
    colorSofa(datasProduct);

}

main()

//fonction qui récupère l'ID du produit à afficher
function recoverId(){
    const urlProduit = window.location.search; // récupère l'id dans l'url (après le ?) = clé + valeur
    const urlSearchParams = new URLSearchParams(urlProduit);
    id = urlSearchParams.get('id'); //récupère la clé id 
    //console.log(id)
};

// récupère les données d'un produit par son ID
function fetchDataProduct(){
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log("il y a une erreur sur la page produit de type :" + e));
};

//récupère les informations sur un produit
function recoverElements(datasProduct){
    descriptionElement = datasProduct.description;
    priceElement = datasProduct.price;
    imageElement = datasProduct.imageUrl;
    altImageElement = datasProduct.altTxt;
    nameElement = datasProduct.name;
}
//créé les balises manquantes
function createTag(){
    tagImg = document.createElement('img');
    document.querySelector(".item__img").appendChild(tagImg);
}

//affiche sur la page les éléments récupérés via l'API
function displayElements(){
    tagImg.src = imageElement;
    tagImg.alt = altImageElement;
    document.querySelector("#title").innerHTML = nameElement; // rajouter le nom dans balise title
    document.querySelector("#price").innerHTML = priceElement;
    document.querySelector("#description").innerHTML = descriptionElement;
}

//spécifique pour la sélection des couleurs
function colorSofa(datasProduct){
    colorsElement = datasProduct.colors;
    for (color of colorsElement){
        tagOptionColor = document.createElement('option');
        document.querySelector("#colors").appendChild(tagOptionColor);
        tagOptionColor.value = color;
        tagOptionColor.innerHTML = color;
    }
  
}

