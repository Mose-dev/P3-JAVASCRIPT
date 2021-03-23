class Reservation {
  constructor() {
    this.stocker = document.getElementById('reserver');
    this.nom = document.getElementById('name');
    this.prenom = document.getElementById('firstname');
    this.canvas = document.getElementById('canvas');
    this.validCanvas = document.getElementById('validation_canvas');
    this.valider = document.getElementById("valider");
    this.info_carte = document.getElementById('notice');
    this.confirmation = document.getElementById('confirmation');
    this.clear = document.getElementById('restart');
    this.valider.addEventListener("click", () => {this.afficher();});
    this.clear.addEventListener('click', () => {this.clearCanvas();});
    this.storage();
    this.verifLocalStorage();
    this.validation();
    this.cancelCanvas();
  }
  //Stockage des informations dans localStorage
  storage() {
    this.stocker.addEventListener('click', () => { 
      localStorage.setItem('name', this.nom.value);
      localStorage.setItem('firstname', this.prenom.value);
    });
  }
  // Méthode de vérification des données en local Storage
	verifLocalStorage() {
    if(localStorage.getItem("name")){
			this.nom.value = localStorage.getItem("name");
		}
    if(localStorage.getItem("firstname")){
			this.prenom.value = localStorage.getItem("firstname");
    }
	}
  //Validation du formulaire "Votre station" et apparition du canvas
  validation() {
    let verifieNom = document.getElementById('name');
    let verifiePrenom = document.getElementById('firstname');
    let lack = document.getElementById('lack_name');
    let encart = document.getElementById('info_station');
    let regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêçîï]+)?/;
    this.stocker.addEventListener('click', (e) => {
      e.preventDefault();
      if (verifieNom.validity.valueMissing || verifiePrenom.validity.valueMissing) {
        e.preventDefault();
        lack.style.display = 'block';
        lack.textContent = 'veuillez remplir les champs';
        lack.style.backgroundColor = '#FF0000';
        lack.style.color = '#ffffff';
        this.canvas.style.visibility = 'hidden';
        this.validCanvas.style.visibility = 'hidden';
      }else if (regex.test(verifieNom.value) == false) {
        e.preventDefault();
        lack.style.display = 'block';
        lack.textContent = 'Format invalide';
        lack.style.backgroundColor = '#FF0000';
        lack.style.color = '#ffffff';
        this.canvas.style.visibility = 'hidden';
        this.validCanvas.style.visibility = 'hidden';
      }else if (regex.test(verifiePrenom.value) == false) {
        e.preventDefault();
        lack.style.display = 'block';
        lack.textContent = 'Format invalide';
        lack.style.backgroundColor = '#FF0000';
        lack.style.color = '#ffffff';
        this.canvas.style.visibility = 'hidden';
        this.validCanvas.style.visibility = 'hidden';
      }else { 
        lack.style.display = 'none';
        encart.style.display = 'none';
        this.info_carte.innerHTML = 'Signez et validez votre réservation';
        this.info_carte.style.backgroundColor = "#FFA500";
        this.canvas.style.visibility = 'visible';
        this.validCanvas.style.visibility = 'visible';
        this.clearCanvas();
      }
    });
  } //Affichage de l'encart confirmation à partir du canvas
  afficher() {
    let name = document.getElementById('encart_nom');
    let firstname = document.getElementById('encart_prenom');
    let adresse = document.getElementById('encart_adresse');
    this.valider.style.visibility = 'hidden';
    this.confirmation.style.display = 'block';
    this.validCanvas.style.visibility = 'hidden';
    this.canvas.style.visibility = 'hidden';
    this.info_carte.innerHTML = 'Réservation confirmée';
    this.info_carte.style.backgroundColor = '#15ff00'; 
    name.innerHTML = localStorage.getItem('name');
    firstname.innerHTML = localStorage.getItem('firstname');
    adresse.innerHTML = sessionStorage.getItem('stationName');
    this.clearCanvas();
  }
  //Efface la signature sur le canvas
  clearCanvas() {
    this.context = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.x = 0;
    this.y = 0;
    // On récupère le decalage du canevas en x et y par rapport aux bords
    // de la page
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  cancelCanvas() {
    let cancel = document.getElementById('annuler');
    cancel.addEventListener('click', () => {
      let confirm = window.confirm("Voulez vous annuler votre résérvation ?");
      if (confirm == true) { 
        sessionStorage.clear();
        this.canvas.style.visibility = 'hidden';
        this.validCanvas.style.visibility = 'hidden';
        this.valider.style.visibility ="hidden";
        this.info_carte.innerHTML = 'Réservation annulée';
        this.info_carte.style.color = '#ffffff';
        this.info_carte.style.backgroundColor = '#FF0000';
      }
    });
  }
}


















