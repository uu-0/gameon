function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnSubmit = document.querySelector(".btn-submit");
const btnClose = document.querySelector('.close-btn');
const inscriptionForm = document.querySelector("#inscription-form");
const thanksBlock = document.querySelector(".thanks");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//validation du formulaire
btnSubmit.addEventListener("click", validate);

//fermeture remerciments via btn
btnClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal(){
  thanksBlock.style.display = "none";
  inscriptionForm.style.display = "block";
  modalbg.style.display = "none";
}
//validation du formulaire, si valide affichage des remerciments
function validate(e) {
  launchThanks()
}

//affichage les remerciements
function launchThanks(){
  inscriptionForm.style.display = "none"
  thanksBlock.style.display = "block";
}
