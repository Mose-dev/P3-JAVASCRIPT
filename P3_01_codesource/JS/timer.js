class Timer {
     constructor() {
          if (sessionStorage.getItem('timerMinute') && sessionStorage.getItem('timerSeconde')){
               this.minute = sessionStorage.getItem('timerMinute');
               this.seconde = sessionStorage.getItem('timerSeconde');
          }else {
               this.minute = 20;
               this.seconde = 0;
          }
          this.avis = document.getElementById('notice');
          
          document.getElementById('valider').addEventListener('click', () => {
               this.stopTimer();
               this.minute = 20;
               this.seconde = 0;
               document.getElementById('confirmation').style.visibility = 'visible';
               this.back = setInterval( () =>  this.initTimer(), 1000 );
          });
     }
     updateTimer(){//Affiche le temps restant
          let m = this.minute;
          let s = this.seconde;
          if ( m < 10 && m.toString().length < 2) { m = '0' + m };
          if ( s < 10 && s.toString().length < 2) { s = '0' + s }; 
          document.getElementById('chrono').textContent = m + ":" + s;
          sessionStorage.setItem("timerMinute", m );
          sessionStorage.setItem("timerSeconde", s );
     }
     initTimer() {// Expiration de la réservation
          if ( this.seconde == 0 && this.minute == 0 ){
               this.avis.innerHTML = "Réservation expirée";
               this.avis.style.backgroundColor = '#FF0000';
               this.avis.style.color = '#ffffff';
               document.getElementById('confirmation').style.visibility = 'hidden';
               this.stopTimer();
               sessionStorage.clear();
          } else {
               if ( this.seconde == 0) {
                    this.seconde = 59;
                    this.minute--;
               }else {
                    this.seconde--;
               }
               this.updateTimer();
          }
     }
     stopTimer() {//Arrête le timer
          clearInterval(this.back);
          sessionStorage.removeItem("timerMinute");
          sessionStorage.removeItem("timerSeconde");
     }
}
