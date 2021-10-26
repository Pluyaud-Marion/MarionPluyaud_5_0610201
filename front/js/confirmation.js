let tagOrderId = document.querySelector("#orderId");


const urlConfirmation = window.location.search; // récupère l'id dans l'url (après le ?) = clé + valeur
const urlSearchParams = new URLSearchParams(urlConfirmation);
tagOrderId.innerHTML = urlSearchParams.get('orderId'); //récupère la clé orderId 
