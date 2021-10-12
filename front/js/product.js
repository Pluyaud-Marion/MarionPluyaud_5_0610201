
function main(){
    recoverId();
}

main()

function recoverId(){
    const urlProduit = window.location.search; // récupère l'id dans l'url (après le ?) = clé + valeur
    const urlSearchParams = new URLSearchParams(urlProduit);
    const id = urlSearchParams.get('id'); //récupère la clé id 
    console.log(id)
}
