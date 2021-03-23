
class Canvas{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.posX = 0;
    this.posY = 0;
    this.isDrawing = false;
    this.getEvent(); 
  }
  // GESTION DE TOUS LES ÉVÉNEMENTS SUR LE CANVAS
  getEvent(){
    
    // Quand le click sur la souris demeure enclanché
    this.canvas.addEventListener('mousedown', e => {
      
      this.posX = e.pageX - this.canvas.offsetLeft; // Récupère X au click
      this.posY = e.pageY - this.canvas.offsetTop; // Récupère Y au click
      
      this.isDrawing = true;
    });
    
    // Quand le curseur bouge sur le canvas
    this.canvas.addEventListener('mousemove', e => {
      if (this.isDrawing === true) {
        
        // Si mousedown, alors on dessine avec X et Y de mousedown + X et Y en temps réel quand mousemove
        this.drawLine(this.posX, this.posY, e.pageX - this.canvas.offsetLeft , e.pageY - this.canvas.offsetTop);
        
        this.posX = e.pageX - this.canvas.offsetLeft;
        this.posY = e.pageY - this.canvas.offsetTop;
      }
    });
    
    // Quand on désenclanche le click de la souris
    window.addEventListener('mouseup', e => {
      if (this.isDrawing === true) {
        
        //On dessine jusqu'à la dernière position puis on désenclanche
        this.drawLine(this.posX, this.posY, e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
        
        // Réinitialise les positions X et Y
        this.posX = 0;
        this.posY = 0;
        this.isDrawing = false;
        
      }
    });
    // ÉVÉNEMENTS TACTILES 
    
    //idem que mousedown
    this.canvas.addEventListener('touchstart', e => {
      
      let touchObj = e.changedTouches[0];
      
      this.posX = touchObj.pageX - this.canvas.offsetLeft; // Récupère X au touché
      this.posY = touchObj.pageY - this.canvas.offsetTop; // Récupère Y au touché
      
      this.isDrawing = true;
      
      e.preventDefault(); // Évite que la page scroll pendant la signature
      
      
    });
    // Idem que mousemouve
    this.canvas.addEventListener('touchmove', e => {
      
      if (this.isDrawing === true) {
        
        let touchObj = e.changedTouches[0];
        
        this.drawLine(this.posX, this.posY, touchObj.pageX - this.canvas.offsetLeft , touchObj.pageY - this.canvas.offsetTop);
        
        this.posX = touchObj.pageX - this.canvas.offsetLeft;
        this.posY = touchObj.pageY - this.canvas.offsetTop;
        
        e.preventDefault();
      }
    });
    // Idem que mouseup
    window.addEventListener('touchend', e => {
      
      if (this.isDrawing === true) {
        
        let touchObj = e.changedTouches[0];
        
        this.drawLine(this.posX, this.posY, touchObj.pageX - this.canvas.offsetLeft, touchObj.pageY - this.canvas.offsetTop);
        
        this.posX = 0;
        this.posY = 0;
        
        this.isDrawing = false;
        
        
        e.preventDefault();
      }
    });
    
  }
  // Méthode permettant de dessiner une ligne
  drawLine(x1, y1, x2, y2){
    
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    //Apparition du bouton de validation du canvas
    if (this.isDrawing === true) {
      document.getElementById("valider").style.visibility = "visible";
    }
  }
  
}


