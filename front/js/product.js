/*
Fonction principale
*/
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
    addArray(idProduct, datasProduct);

    console.log("Informations sur cet article : ", datasProduct);
}

/*
Récupère l'ID du produit à afficher et le met ds idProduct
*/
function recoverId(idProduct){
    const urlProduit = window.location.search; // récupère l'id dans l'url (après le ?) = clé + valeur
    const urlSearchParams = new URLSearchParams(urlProduit);
    idProduct.id = urlSearchParams.get('id'); //récupère la clé id 
};

/*
Récupère les données d'un produit, grâce à son ID, dans l'API et return la promesse pour les récupérer dans datasProduct dans main
*/
function fetchDataProduct(idProduct){
    return fetch(`http://localhost:3000/api/products/${idProduct.id}`)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur sur la page produit de type :" + e));
};

/*
Récupère à partir de datasProduct les infos sur le produit sélectionné et les stocke dans elements
*/
function recoverElements(datasProduct, elements){
    elements.descriptionElement = datasProduct.description;
    elements.priceElement = datasProduct.price;
    elements.imageElement = datasProduct.imageUrl;
    elements.altImageElement = datasProduct.altTxt;
    elements.nameElement = datasProduct.name;
}

/*
Création balise img et insertion dans le DOM
*/
function createTag(tags){
    tags.tagImg = document.createElement('img');
    document.querySelector(".item__img").appendChild(tags.tagImg);
}

/*
Affichage sur la page des données récupérées par l'API et stockées dans elements 
*/
function displayElements(elements, tags){
    tags.tagImg.src = elements.imageElement;
    tags.tagImg.alt = elements.altImageElement;
    document.querySelector("#title").innerHTML = elements.nameElement; 
    document.querySelector("#price").innerHTML = elements.priceElement;
    document.querySelector("#description").innerHTML = elements.descriptionElement;
}

/*
Affichage du menu déroulant des couleurs disponibles pour chaque article
*/
function colorSofa(datasProduct, elements, tags){
    elements.colorsElement = datasProduct.colors;
    for (let color of elements.colorsElement){
        tags.tagOptionColor = document.createElement('option');
        document.querySelector("#colors").appendChild(tags.tagOptionColor);
        tags.tagOptionColor.value = color;
        tags.tagOptionColor.innerHTML = color;
    }
    console.log("Couleurs disponibles pour cet article : ",datasProduct.colors);
}

/*
Récupération de chaque produit (et ses caractéristiques) ajoutés au panier = productChoice
Ajout de chaque productChoice dans un tabeau arrayCart qui représente le panier
Envoi du arrayCart dans localstorage
+ vérification si même produit (même id et même couleur) sont déjà dans arrayCart = si oui incrémentation de la quantité seulement et pas d'ajout dans arrayCart / si non ajout dans arrayCart
*/
function addArray(idProduct, datasProduct){
    document.querySelector("#addToCart").addEventListener("click", event => {
        event.preventDefault();
        let productChoice = {
            colorChoice : document.querySelector("#colors").value,
            quantityChoice : parseInt(document.querySelector("#quantity").value),
            idChoice : idProduct.id,
            pictureChoice : datasProduct.imageUrl,
            titleChoice : datasProduct.name,
            priceChoice :  datasProduct.price,
        }

        let arrayCart = [];
        
        if (localStorage.getItem("products")) { //si LS non vide
            arrayCart = JSON.parse(localStorage.getItem("products")); // on récupère son contenu et on l'insère ds [arrayCart]
            //Si ds arrayCart il y a produit qui a même couleur + même ID -> on retourne le produit déjà existant sous forme de tableau
            const elementExistingInArrayCart = arrayCart.filter(product => product.colorChoice === productChoice.colorChoice && product.idChoice === productChoice.idChoice)
    
            // si le tableau retourné ds elementExistingInArrayCart est rempli = c'est qu'il y a un doublon
            if (elementExistingInArrayCart.length){ 
                // on ajoute la quantité choisie à la quantité déjà existante
                let total = productChoice.quantityChoice + elementExistingInArrayCart[0].quantityChoice
                console.log("Ce produit est déjà dans le panier, le total de cet article choisi : ", total);
                
                //pour chaque produit dans arrayCart, si la couleur et l'id du produit nouveau est identique à la couleur et l'id d'un produit déjà existant -> la nouvelle quantité correspond à l'addition
                for (let product of arrayCart){
                    if (product.colorChoice === productChoice.colorChoice && product.idChoice === productChoice.idChoice){
                        product.quantityChoice = total;
                    }
                }
            
            // si le tableau retourné dans elementExistingInArrayCart est vide = on push le nouveau produit
            }else{
                arrayCart.push(productChoice);
            }
            //on envoi ds localstorage le tableau au format JSON
            localStorage.setItem("products", JSON.stringify(arrayCart));
           

        } else{ ////// si LS est vide on le créé avec le produit ajouté
            arrayCart.push(productChoice); /////// on push le produit sélectionné vers [arrayCart]
            localStorage.setItem("products", JSON.stringify(arrayCart)); /////// on envoi arrayCart au format JSON ds Localstorage
        }
        console.log("produit ajouté au panier : ", productChoice);
    })
}

main()


