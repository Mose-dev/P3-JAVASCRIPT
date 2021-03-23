class Diaporama{
    constructor(id, imgs){
        this.idDiapo = id;
        this.imgs = imgs;
        this.domSlide = document.getElementById(this.idDiapo);
        this.domImg = this.domSlide.querySelector('header img');
        this.domPrev = this.domSlide.querySelector('div.prevBtn');
        this.domNext = this.domSlide.querySelector('div.nextBtn');
        this.domPause = this.domSlide.querySelector('div.pauseBtn');
        this.timer = 0;
        this.imgNumber = 0;
        // Evénements
        this.domPrev.addEventListener('click', () => {
            this.prevImage();
        });
        this.domNext.addEventListener('click', () => {  
            this.nextImage(); 
        });
        this.domPause.addEventListener('click', () => {
            this.playPause();
        });
        document.addEventListener('keydown', this.keyboard.bind(this));
        this.playPause();
        this.prevImage();
        this.nextImage();
    }
    // Bouton prev 
    prevImage() {
        this.imgNumber--;
        if (this.imgNumber < 0) {
            this.imgNumber = this.imgs.length - 1;
        }
        this.domImg.src = this.imgs[this.imgNumber];
    }
    // Bouton next 
    nextImage() {
        this.imgNumber++;
        if (this.imgNumber > this.imgs.length - 1) {
            this.imgNumber = 0;
        }
        this.domImg.src = this.imgs[this.imgNumber];
    }
    // Clavier 
    keyboard(e){
        switch(e.keyCode){
            case 39: this.nextImage();//left arrow
            break;
            case 37: this.prevImage();//right arrow
            break;
        };
    }
    // Auto + bouton play-pause 
    playPause() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
            this.domPause.className = "playBtn";
        } else {
            this.timer = setInterval(this.nextImage.bind(this), 5000);
            this.domPause.className = "pauseBtn";
        }
    }
}
let slide = new Diaporama ('slideshow',
['images/veloloc.jpg',
'images/img1.png',
'images/img2.png',
'images/img3.png',
'images/img4.png',
'images/velofin.png']
);
