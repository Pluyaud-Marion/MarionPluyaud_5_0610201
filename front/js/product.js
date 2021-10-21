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
  //  .then(data => data)’
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
            quantityChoice : parseInt(document.querySelector("#quantity").value),
            idChoice : idProduct.id,
        }
        
        let arrayCart = [];
        
        /////// si LS n'est pas vide = on récupère son contenu + on l'insère dans le tableau arrayCart + on le renvoit vers LS avec le nouveau contenu
        if (localStorage.getItem("products")) { ////// si LS non vide
            arrayCart = JSON.parse(localStorage.getItem("products")); ///// on récupère son contenu et on l'insère ds [arrayCart]

            /////Si ds arrayCart il y a produit qui a même couleur + même ID -> on retourne le produit déjà existant sous forme de tableau
            const elementExistingInArrayCart = arrayCart.filter(product => product.colorChoice === productChoice.colorChoice && product.idChoice === productChoice.idChoice)
            //console.log("elementExistingInArrayCart", elementExistingInArrayCart);

            // si le tableau retourné ds elementExistingInArrayCart est rempli = c'est qu'il y a un doublon
            if (elementExistingInArrayCart.length){ 
                // on ajoute la quantité choisie à la quantité déjà existante
                let total = productChoice.quantityChoice + elementExistingInArrayCart[0].quantityChoice
                console.log("il y a déjà ce produit dans le panier, On l'ajoute. Total de ce produit : ", total);
                
                //pour chaque produit dans arrayCart, si la couleur et l'id du produit nouveau est identique à la couleur et l'id d'un produit dékà existant -> la nouvelle quantité correspond à l'addition
                for (product of arrayCart){
                    if (product.colorChoice === productChoice.colorChoice && product.idChoice === productChoice.idChoice){
                        product.quantityChoice = total;
                        console.log(arrayCart);
                    }
                }
            
            // si le tableau retourné dans elementExistingInArrayCart est vide = on push le nouveau produit
            }else{
                arrayCart.push(productChoice);
            }
            //on envoi ds localstorage le tableau au format JSON
            localStorage.setItem("products", JSON.stringify(arrayCart));
            console.log("panier rempli")


        } else{ ////// si LS est vide on le créé avec le produit ajouté
            arrayCart.push(productChoice); /////// on push le produit sélectionné vers [arrayCart]
            localStorage.setItem("products", JSON.stringify(arrayCart)); /////// on envoi arrayCart au format JSON ds Localstorage
            console.log("panier vide");
        }

    })
}




