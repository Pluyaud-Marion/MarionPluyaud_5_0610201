//récupération du span orderId
let tagOrderId = document.querySelector("#orderId");

//utilisation de URLSearchParams pour récupérer dans l'url l'orderId -> "?orderId="
const urlConfirmation = window.location.search; 
const urlSearchParams = new URLSearchParams(urlConfirmation);
tagOrderId.innerHTML = urlSearchParams.get('orderId'); //récupère la clé orderId et l'insère dans le span
