
const urlKanap = "http://localhost:3000/api/products";

fetch(urlKanap)
.then(response => response.json())
.then(data=> {
    //console.log(data); //Affiche dans la console le tableau des données

    const baliseSection = document.createElement('section'); // créé la balise section
    baliseSection.classList.add('items'); // ajoute à la balise section classe .items
    const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock"); // pointe sur l'élément main qui a la classe limitedWidthBlock
    selectDivLimitedWidthBlock.appendChild(baliseSection); // ajout de la balise section comme enfant de la div class limitedWithBlock

    for (sofa of data) { // pour chaque canapé dans le tableau (chaque élément dans le array)
        const baliseA = document.createElement('a'); // création balise a
        baliseSection.appendChild(baliseA); // ajout balise a dans balise section
        const baliseArticle = document.createElement('article'); // créé balise article
        baliseA.appendChild(baliseArticle); // ajout balise article comme enfant de balise A
    
        const baliseImg = document.createElement('img'); // créé balise img
        baliseImg.src = sofa.imageUrl; // récupère urlimage de chaque élément
        baliseImg.alt = sofa.altTxt; // récupère le alt 
        baliseArticle.appendChild(baliseImg); // dans balise article ajout de la balise img

        const baliseh3 = document.createElement('h3'); // créé balise h3
        baliseh3.classList.add('productName'); // ajoute la classe .productName à la balise
        baliseArticle.appendChild(baliseh3); // ajoute la balise h3 sur le DOM dans la balise article
        baliseh3.innerHTML = sofa.name; // récupère pour chaque élément le name et l'insère dans h3

        const baliseP = document.createElement('p');
        baliseP.classList.add('productDescription');
        baliseArticle.appendChild(baliseP);
        baliseP.innerHTML = sofa.description
    }
})
.catch(e => console.log("il y a une erreur de type : " + e));

