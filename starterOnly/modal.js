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
  //empêche le form de se soumettre automatiquement
  e.preventDefault();

  //validation prénom
  let firstName = document.querySelector("#first").value;
  //le champs n'est pas vide
  if (firstName === "") {
    showValidationError(formData[0], "Le prénom est requis");
  }//le champs a plus de deux caractères
  else if (firstName.length < 2) {
    showValidationError(formData[0], "Le prénom doit comporter au moins 2 caractères");
  }//prénom validé
  else {
    hideValidationError(formData[0]);
  }

  //validation nom
  let lastName = document.querySelector("#last").value;
  //le champs n'est pas vide
  if (lastName === "") {
    showValidationError(formData[1], "Le nom est requis");
  }//le champs a plus de deux caractères
  else if (lastName.length < 2) {
    showValidationError(formData[1], "Le nom doit comporter au moins 2 caractères");
  }//nom validé
  else {
    hideValidationError(formData[1]);
  }

  //validation email
  let email = document.querySelector("#email").value;
  //le champs n'est pas vide
  if (email === "") {
    showValidationError(formData[2], "Une adresse email est requise");
  } //le champs est valide en fonction de validateEmailAddress()
  else if (!validateEmailAddress(email)) {
    showValidationError(formData[2], "Cette adresse e-mail n'est pas valide");
  }//email validé
   else {
    hideValidationError(formData[2]);
  }

  //validation date de naissance
  let dateOfBirth = new Date(document.querySelector("#birthdate").value); //valeurs du champs input #birthdate converti en type Date
  const today = new Date(); //date d'ajd
  const maxDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()); //date maximale autorisée (-100 ans à partir de la date actuelle)

  //le champs n'est pas vide
  if (dateOfBirth === "") {
    showValidationError(formData[3], "Veuillez entrer votre date de naissance");
  }//le champs n'est pas valide (pas de type date)
  else if (isNaN(dateOfBirth.getTime())) {
    showValidationError(formData[3], "Veuillez entrer votre date de naissance");
  }//le champs n'est pas valide (date trop vieille ou date future)
  else if (dateOfBirth < maxDate || dateOfBirth > today ){
    showValidationError(formData[3], "Veuillez entrer une date de naissance valide");
  }//date de naissance validée
  else{
    hideValidationError(formData[3]);
  }

  //validation nombre de tournois
  let nbOfTournaments = document.querySelector("#quantity").value;
  //le champs n'est pas vide
  if (nbOfTournaments === "") {
    showValidationError(formData[4], "Veuillez sélectionner un nombre");
  }//nombre de tournois validé
  else {
    hideValidationError(formData[4]);
  }

  //validation sélection tournois
  let tournamentChoice = document.querySelector("input[type=radio]:checked");
  //champs non sélectionné
  if (!tournamentChoice) {
    showValidationError(formData[5], "Veuillez sélectionner un tournoi");
  }//séléction tournois validée
  else {
    hideValidationError(formData[5]);
  }

  //validation conditions d'utilisation
  let conditionsOfUseCheckbox = document.querySelector("#checkbox1");
  //champs sélectionné
  if (!conditionsOfUseCheckbox.checked) {
    showValidationError(formData[6], "Veuillez lire et accepter les conditions d'utilisation");
  }//conditions d'utilisations validées
  else {
    hideValidationError(formData[6]);
  }

  //envoi du formulaire s'il n'y a plus d'erreur de validation, affiche les remerciments
  let visibleErrors = document.querySelectorAll("[data-error-visible=true]");
  if (visibleErrors.length === 0) {
    launchThanks();
    /*inscriptionForm.submit();*/
  }
}
