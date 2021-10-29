
/*
Fonction principale
*/
async function main(){
    const datas = await fetchData(); // met dans constante datas les données retournées par fetch
    if (!datas) return
    
    const tags = { 
        tagSection : {},
        tagImg : {},
        tagh3 : {},
        tagP  : {},
        iDom : {},
        tagA : {}
    }

    creatingTagSection(tags);

    for (sofa of datas){
        creatingTags(tags);
        assignData(tags, sofa);
        linkPages(tags);
    }
}

/*
Création de la balise section et placement sur le DOM
*/
function creatingTagSection(tags){
    tags.tagSection = document.createElement('section'); 
    tags.tagSection.classList.add('items'); 
    tags.tagSection.id = 'items';
    const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock");
    selectDivLimitedWidthBlock.appendChild(tags.tagSection); 
}

/*
Récupération des données dans l'API et return de la promesse pour récupérer les datas dans la const datas
*/
function fetchData(){
    return fetch("http://localhost:3000/api/products") 
    .then(response => response.json()) 
    .catch(e => console.log("il y a une erreur de type : " + e));
}

/*
Création des balises A / section / article / img / h3 / p et placement des balises sur le DOM
(pour chaque canapé = appelée dans une boucle for dans main)
*/
function creatingTags(tags){
    tags.tagA = document.createElement('a'); 
    tags.tagSection.appendChild(tags.tagA);
    tags.tagA.href = "./product.html"; 
    const tagArticle = document.createElement('article'); 
    tags.tagA.appendChild(tagArticle); 
    tags.tagImg = document.createElement('img'); 
    tagArticle.appendChild(tags.tagImg);
    tags.tagh3 = document.createElement('h3');
    tags.tagh3.classList.add('productName'); 
    tagArticle.appendChild(tags.tagh3); 
    tags.tagP = document.createElement('p');
    tags.tagP.classList.add('productDescription');
    tagArticle.appendChild(tags.tagP);
}

/*
Permet d'assigner les données récupérées par fetchData aux balises créées 
(pour chaque canapé = appelée dans une boucle for dans main)
*/
function assignData(tags, sofa){
    tags.tagImg.src = sofa.imageUrl; 
    tags.tagImg.alt = sofa.altTxt; 
    tags.tagh3.innerHTML = sofa.name; 
    tags.tagP.innerHTML = sofa.description
    tags.idDom = sofa._id;
}

/*
Permet de faire le lien entre un produit sur page d'accueil et page produit
(pour chaque canapé = appelée dans une boucle for dans main)
*/
function linkPages(tags){
    const newHref = tags.tagA.href += "?id=" + tags.idDom;
}


main()