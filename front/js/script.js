let tagSection =  ""; 
let tagImg = "";
let tagh3 = "";
let tagP = "";  
let iDom = "";
let tagA ="";

async function main(){
    const datas = await fetchData(); // met dans constante datas les données retournées par fetch

    creatingTagSection();

    for (sofa of datas){
        creatingTags();
        assignData(sofa);
        linkPages();
    }
    //addElements();
}

main()
//fonction pour créer le tag section et le placer sur le DOM
function creatingTagSection(){
    tagSection = document.createElement('section'); // créé la balise section
    tagSection.classList.add('items'); // ajoute à la balise section classe .items
    tagSection.id = 'items'; // ajoute à la balise section l'id #items
    const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock"); // pointe sur l'élément main qui a la classe limitedWidthBlock
    selectDivLimitedWidthBlock.appendChild(tagSection); // ajout de la balise section comme enfant de la div class limitedWithBlock
}

// fonction pour récupérer les données 
function fetchData(){
    return fetch("http://localhost:3000/api/products") //retourne la promesse
    .then(response => response.json()) // format json pour les récupérer dans fonction main
    .then(data => data) // ?????
    .catch(e => console.log("il y a une erreur de type : " + e));
}

// fonction pour créer les balises + les mettre aux bons endroits du DOM 
function creatingTags(){
    tagA = document.createElement('a'); // création balise a
    tagSection.appendChild(tagA); // ajout balise a dans balise section
    tagA.href = "./product.html"; //ajout attribut href
    const tagArticle = document.createElement('article'); // créé balise article
    tagA.appendChild(tagArticle); // ajout balise article comme enfant de balise A
    tagImg = document.createElement('img'); // créé balise img
    tagArticle.appendChild(tagImg);
    tagh3 = document.createElement('h3'); // créé balise h3
    tagh3.classList.add('productName'); // ajoute la classe .productName à la balise
    tagArticle.appendChild(tagh3); // ajoute la balise h3 sur le DOM dans la balise article
    tagP = document.createElement('p');
    tagP.classList.add('productDescription');
    tagArticle.appendChild(tagP);
}

// fonction pour assigner les données récupérées par fetchData dans les balises créées
function assignData(sofa){
    tagImg.src = sofa.imageUrl; // assigne urlimage de chaque élément
    tagImg.alt = sofa.altTxt; // assigne le alt
    tagh3.innerHTML = sofa.name; // assigne pour chaque élément le name et l'insère dans h3
    tagP.innerHTML = sofa.description
    idDom = sofa._id;
}

// fonction pour faire le lien entre un produit sur page d'accueil et page produit
function linkPages(){
    const newHref = tagA.href += "?id=" + idDom;
    console.log(newHref)
}
