let code1 = document.getElementsByClassName("code")[0];
let code2 = document.getElementsByClassName("code")[1];
let code3 = document.getElementsByClassName("code")[2];
let code4 = document.getElementsByClassName("code")[3];
let code5 = document.getElementsByClassName("code")[4];
let unlock = document.getElementById("unlock");
let begin = document.getElementById("start");
let couvercle = document.getElementById("couvercle");
let cadenas = document.getElementById("cadenas");
let faux = document.getElementById("faux");
let sonfaux = document.getElementById("sonfaux");
let sonbon = document.getElementById("sonbon");
let gameover = document.getElementById("gameover");
let raté = document.getElementById("raté");
let transi = document.getElementById("transi");
let sonjeu = document.getElementById("cparty");
let minute = document.getElementById("minutes");
let secondes = document.getElementById("secondes");
let cutscene = document.getElementById("cutscene");
let soncutscene = document.getElementById("soncutscene");
let succés = document.getElementById("succés");

/*Fonction qui véréfie le code du cadenas au clic sur le bouton "Déverrouiller !"*/
function checkCode(){
    flag = true;
    if(code1.value != 8){
        code1.style.backgroundColor = "red";
        flag = false;
    }
    else{
        code1.style.backgroundColor = "green";
    }
    if(code2.value != 5){
        code2.style.backgroundColor = "red";
        flag = false;
    }
    else{
        code2.style.backgroundColor = "green";
    }
    if(code3.value != 9){
        code3.style.backgroundColor = "red";
        flag = false;
    }
    else{
        code3.style.backgroundColor = "green";
    }
    if(code4.value != 2){
        code4.style.backgroundColor = "red";
        flag = false;
    }
    else{
        code4.style.backgroundColor = "green";
    }
    if(code5.value != 3){
        code5.style.backgroundColor = "red";
        flag = false;
    }
    else{
        code5.style.backgroundColor = "green";
    }
    if(flag){
        stopTimer();
        cadenas.style.opacity = "0%";
        blink(bon);
        setTimeout(playCutscene, 2000);
    }
    else{
        sonfaux.play();
        blink(faux);    
    }
}

/*Fonction qui fait clignoter un div en fonction de si le code est bon ou non*/
function blink(div) {
    const displays = ["block", "none"];
    let displayIndex = 0;
    let counter = 0;
    const intervalId = setInterval(function() {
      if (displayIndex === displays.length) {
        displayIndex = 0;
      }
      div.style.display = displays[displayIndex];
      displayIndex++;
      if (++counter === 8) {
        clearInterval(intervalId);
      }
    }, 100); // 500 ms = 0,5 seconde
}

/*Fonction qui affiche petit à petit l'écran d'échec*/
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.0025;
    }, 5);
}

/*Fonction qui lance le jeu*/
function beginGame(){
    sonjeu.play();
    timer.style.display = "flex";
    unlock.disabled = false;
    unlock.value = "Déverrouiller !"
    this.disabled = true;
    this.value = "C'est parti !";
    starttimer = setInterval(function(){
        if(minute.innerHTML == 01 && secondes.innerHTML == 00){
            minute.innerHTML = 00;
            secondes.innerHTML = 59;
        }
        else if(minute.innerHTML == 00 && secondes.innerHTML == 00){
            fail();
        }
        else{
            secondes.innerHTML = secondes.innerHTML - 1;
        }
    }, 1000);
}

/*Fonction qui arrête le timer si le code est trouvé*/
function stopTimer(){
    sonjeu.pause();
    clearInterval(starttimer);
}

/*Fonction qui arrête le timer si le timer arrive à 0*/
function fail(){
    clearInterval(starttimer);
    sonjeu.pause();
    gameover.play();
    unfade(raté);
}

/*Fonction qui lance la cinématique si le code est trouvé*/
function playCutscene(){
    cutscene.hidden = false;
    cutscene.play();
    soncutscene.play();
    setTimeout(congrats, 10000);
}

function congrats(){
    sonbon.play();
    unfade(succés);
}

unlock.addEventListener("click", checkCode);
begin.addEventListener("click", beginGame);