let carte = new Carte();
let reservation = new Reservation();
let canvas = new Canvas(document.getElementById('canvas'));
let timer = new Timer();

window.onload = () => {
     if (sessionStorage.getItem('timerMinute')) {
          if (sessionStorage.getItem('timerMinute').length != null){
               reservation.afficher();
               timer.back = setInterval( () => timer.initTimer(),1000 );
               notice_icone.style.display = 'none';
               
          }
     }
};


