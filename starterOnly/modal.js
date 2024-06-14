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
const btnCross = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//validation du formulaire
btnSubmit.addEventListener("click", validate);

//fermeture remerciments via btn
btnClose.addEventListener("click", closeModal);

btnCross.addEventListener("click", closeModal);

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

//affichage des remerciements
function launchThanks(){
  inscriptionForm.style.display = "none"
  thanksBlock.style.display = "block";
}

//email validation regex
function validateEmailAddress(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

//show validation error
function showValidationError(element, errorMessage) {
  element.setAttribute("data-error", errorMessage);
  element.setAttribute("data-error-visible", true);
}

//hide validation error
function hideValidationError(element) {
  element.setAttribute("data-error-visible", false);
}

//validation du formulaire, si valide affichage des remerciments
function validate(e) {

  e.preventDefault();

  //validation prénom
  let firstName = document.querySelector("#first").value;
  if (firstName === "") {
    showValidationError(formData[0], "Le prénom est requis");
  } else if (firstName.length < 2) {
    showValidationError(formData[0], "Le prénom doit comporter au moins 2 caractères");
  } else {
    //prénom validé
    hideValidationError(formData[0]);
  }

  //validation nom
  let lastName = document.querySelector("#last").value;
  if (lastName === "") {
    showValidationError(formData[1], "Le nom est requis");
  } else if (lastName.length < 2) {
    showValidationError(formData[1], "Le nom doit comporter au moins 2 caractères");
  } else {
    //nom validé
    hideValidationError(formData[1]);
  }

  //validation email
  let email = document.querySelector("#email").value;
  if (email === "") {
    showValidationError(formData[2], "Une adresse email est requise");
  } else if (!validateEmailAddress(email)) {
    showValidationError(formData[2], "Cette adresse e-mail n'est pas valide");
  } else {
    //email validé
    hideValidationError(formData[2]);
  }

  //validation nombre de tournois
  let nbOfTournaments = document.querySelector("#quantity").value;
  if (nbOfTournaments === "") {
    showValidationError(formData[4], "Veuillez sélectionner un nombre");
  } else {
    //nombre de tournois validé
    hideValidationError(formData[4]);
  }

  //validation sélection tournois
  let tournamentChoice = document.querySelector("input[type=radio]:checked");
  if (!tournamentChoice) {
    showValidationError(formData[5], "Veuillez sélectionner un tournoi");
  } else {
    //séléction tournois validée
    hideValidationError(formData[5]);
  }

  //validation conditions d'utilisation
  let conditionsOfUseCheckbox = document.querySelector("#checkbox1");
  if (!conditionsOfUseCheckbox.checked) {
    showValidationError(formData[6], "Veuillez lire et accepter les conditions d'utilisation");
  } else {
    //conditions d'utilisations validées
    hideValidationError(formData[6]);
  }

  //envoi du formulaire s'il n'y a plus d'erreur de validation, affiche les remerciments
  let visibleErrors = document.querySelectorAll("[data-error-visible=true]");
  if (visibleErrors.length === 0) {
    inscriptionForm.submit();
    launchThanks();
  }
}
