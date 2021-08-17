var videosig = document.getElementById("VS");
var textosecreto = document.getElementById("Tex");

function Plays(){
    videosig.play();
    textosecreto.style.display = "block";
  }

function Pause(){
    videosig.pause();
}

function Retroceder(){
    videosig.currentTime = 0;
}

function BajarV(){
    videosig.volume = 0;
}

function SubirV(){
    videosig.volume = 1;
}

function Pantallacompleta(){
    if (screenfull.isEnabled) {
        screenfull.request(videosig);
    }
}