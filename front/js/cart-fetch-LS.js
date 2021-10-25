
let productInStorage = JSON.parse(localStorage.getItem("products"));

async function main(){

    // const infosProductInStorage = {
    //     quantity : "",
    //     id : "",
    // }

  
    let datasProductCart = []

    for (sofaInCart of productInStorage){
        datasProductCart.push(await fetchDataCart(sofaInCart))
        
    }   

    //let arrayGlobal = datasProductCart.concat(productInStorage)
   

    

    displayElements(datasProductCart);
    displayTotalPrice(datasProductCart);
    displayTotalQuantity(productInStorage);
    //displayQuantity(productInStorage);
}
//// INUTILE
// function recoverElementsLS(elementsProductLS){
//     for (sofaInCart of productInStorage){
//         elementsProductLS.quantity = sofaInCart.quantityChoice;
//         elementsProductLS.id = sofaInCart.idChoice;
//         //console.log(elementsProductLS.quantity);
//         //console.log(elementsProductLS.id); 
//     }
// }

function fetchDataCart(sofaInCart){
        return fetch(`http://localhost:3000/api/products/${sofaInCart.idChoice}`)
        .then(response =>response.json())
        .catch(e => console.log("il y a une erreur sur la page produit de type :" + e));
}

function displayElements(datasProductCart){
    
    // for (sofaInCart of productInStorage){
    //     let articleTag = document.createElement('article')
    //     articleTag.classList.add('cart__item');
    //     articleTag.dataset.id = sofaInCart.idChoice;
    //     let selectSection = document.getElementById("cart__items");
    //     selectSection.appendChild(articleTag)
    // }
    

    for (article of datasProductCart){
        //console.log(article); // article = les objets et leurs infos du fetch
        //console.log(sofaInCart); // sofaInCart = les objets et leurs infos du localstorage

        let selectTagSection = document.getElementById("cart__items"); 
        
        selectTagSection.innerHTML += `
            <article class="cart__item" data-id="${article.idChoice}">
                <div class="cart__item__img">
                <img src="${article.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${article.name}</h2>
                    <p>${article.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sofaInCart.quantityChoice}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`
        } 
        
            
    
}


// function displayQuantity(productInStorage){
    
//     for (article of productInStorage){
//         console.log(article);

//         let quantity = "";  
//         quantity = article.quantityChoice
//         console.log(quantity);

//         for (sofa of productInStorage){
//             const select = document.querySelector(".itemQuantity");
//             select.value = quantity;
//         }
//         /// autre boucle pour injecter
        
//     }
    
// }
function displayQuantity(productInStorage){


    for (article of productInStorage){
        console.log(article.quantityChoice);

        
        
        const select = document.querySelectorAll(".itemQuantity");
    


        for (selecteur of select){
            selecteur.value = selecteur.quantityChoice
            console.log(selecteur);
        }

  
    }
    
}

function displayTotalPrice(datasProductCart){
    let totalPriceQuantity = "";
    let arrayPrice = [];
   
    for (article of datasProductCart){
        totalPriceQuantity = article.price * sofaInCart.quantityChoice
        arrayPrice.push(totalPriceQuantity)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalPrice = arrayPrice.reduce(reducer);
        document.getElementById("totalPrice").innerHTML = totalPrice
    }
    
}

function displayTotalQuantity(productInStorage){
    const arrayQuantity = [];

    for (sofa of productInStorage){
        arrayQuantity.push(sofa.quantityChoice)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalQuantity = arrayQuantity.reduce(reducer)
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
    }
   

}
main()