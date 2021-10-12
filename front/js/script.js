const tagSection = document.createElement('section'); // créé la balise section

function main(){
    creatingBalises();
    addElements();
}
main()
function creatingBalises(){
    //const baliseSection = document.createElement('section'); // créé la balise section
    tagSection.classList.add('items'); // ajoute à la balise section classe .items
    tagSection.id = 'items'; // ajoute à la balise section l'id #items
    const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock"); // pointe sur l'élément main qui a la classe limitedWidthBlock
    selectDivLimitedWidthBlock.appendChild(tagSection); // ajout de la balise section comme enfant de la div class limitedWithBlock
}

function addElements(){
    const urlKanap = "http://localhost:3000/api/products";

    fetch(urlKanap)
    .then(response => response.json())
    .then(data=> {
        for (sofa of data) { // pour chaque canapé dans le tableau 
            const tagA = document.createElement('a'); // création balise a
            tagSection.appendChild(tagA); // ajout balise a dans balise section
            tagA.href = "./product.html"; //ajout attribut href
    
            const tagArticle = document.createElement('article'); // créé balise article
            tagA.appendChild(tagArticle); // ajout balise article comme enfant de balise A
        
            const tagImg = document.createElement('img'); // créé balise img
            tagImg.src = sofa.imageUrl; // récupère urlimage de chaque élément
            tagImg.alt = sofa.altTxt; // récupère le alt 
            tagArticle.appendChild(tagImg); // dans balise article ajout de la balise img
    
            const tagh3 = document.createElement('h3'); // créé balise h3
            tagh3.classList.add('productName'); // ajoute la classe .productName à la balise
            tagArticle.appendChild(tagh3); // ajoute la balise h3 sur le DOM dans la balise article
            tagh3.innerHTML = sofa.name; // récupère pour chaque élément le name et l'insère dans h3
    
            const tagP = document.createElement('p');
            tagP.classList.add('productDescription');
            tagArticle.appendChild(tagP);
            tagP.innerHTML = sofa.description

            const idDom = sofa._id;

            const newHref = tagA.href += "?id=" + idDom;
            console.log(newHref)

        }
    })
    .catch(e => console.log("il y a une erreur de type : " + e));   
}
