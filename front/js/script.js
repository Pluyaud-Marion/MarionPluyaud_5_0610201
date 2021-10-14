
async function main(){
    const datas = await fetchData(); // met dans constante datas les données retournées par fetch
    if (!datas) return
    /**
     * @type {{tagSection: object, tagImg: object, tagh3 : object, tagP : object, iDom : object, tagA : object}}

     */
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


//fonction pour créer le tag section et le placer sur le DOM
function creatingTagSection(tags){
    tags.tagSection = document.createElement('section'); // créé la balise section
    tags.tagSection.classList.add('items'); // ajoute à la balise section classe .items
    tags.tagSection.id = 'items'; // ajoute à la balise section l'id #items
    const selectDivLimitedWidthBlock = document.querySelector("main .limitedWidthBlock"); // pointe sur l'élément main qui a la classe limitedWidthBlock
    selectDivLimitedWidthBlock.appendChild(tags.tagSection); // ajout de la balise section comme enfant de la div class limitedWithBlock
}

// fonction pour récupérer les données 
function fetchData(){
    return fetch("http://localhost:3000/api/products") //retourne la promesse
    .then(response => response.json()) // format json pour les récupérer dans fonction main
    .catch(e => console.log("il y a une erreur de type : " + e));
}

// fonction pour créer les balises + les mettre aux bons endroits du DOM 

function creatingTags(tags){
    tags.tagA = document.createElement('a'); // création balise a
    tags.tagSection.appendChild(tags.tagA); // ajout balise a dans balise section
    tags.tagA.href = "./product.html"; //ajout attribut href
    const tagArticle = document.createElement('article'); // créé balise article
    tags.tagA.appendChild(tagArticle); // ajout balise article comme enfant de balise A
    tags.tagImg = document.createElement('img'); // créé balise img
    tagArticle.appendChild(tags.tagImg);
    tags.tagh3 = document.createElement('h3'); // créé balise h3
    tags.tagh3.classList.add('productName'); // ajoute la classe .productName à la balise
    tagArticle.appendChild(tags.tagh3); // ajoute la balise h3 sur le DOM dans la balise article
    tags.tagP = document.createElement('p');
    tags.tagP.classList.add('productDescription');
    tagArticle.appendChild(tags.tagP);
}

// fonction pour assigner les données récupérées par fetchData dans les balises créées
function assignData(tags, sofa){
    tags.tagImg.src = sofa.imageUrl; // assigne urlimage de chaque élément
    tags.tagImg.alt = sofa.altTxt; // assigne le alt
    tags.tagh3.innerHTML = sofa.name; // assigne pour chaque élément le name et l'insère dans h3
    tags.tagP.innerHTML = sofa.description
    tags.idDom = sofa._id;
}

// fonction pour faire le lien entre un produit sur page d'accueil et page produit
function linkPages(tags){
    const newHref = tags.tagA.href += "?id=" + tags.idDom;
    //const newHref = `${tags.tagA.href}?id=`
    console.log(newHref)
}


main()