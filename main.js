var hC = ["card0", "card0", "card1", "card1", "card2", "card2", "card3", "card3", "card4", "card4",
 "card5", "card5", "card6", "card6", "card7", "card7", "card8", "card8", "card9", "card9"];

// Za każdym razem gra jest losowa
function mixArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
mixArray(hC);


let card = [];
let x;
let turnCounter = 0;
let firstCard;
let secondCard;
let lock = false;
let firstCardP;
let secondtCardP;
let cardLock = false;
let cardLeft = 9;


for (let x = 0; x <= 19; x++) {
    card[x] = document.getElementById('card' + x);
    card[x].addEventListener('click', revealCard);
    card[x].value = hC[x];
    card[x].style.opacity = "1";

}

function revealCard() {
    // Odkrycie karty po kliknięciu
    if (cardLock == false && this.style.opacity != 0) {
        cardLock = true;
        this.style.backgroundImage = "url('img/" + this.value + ".png')";
        if (lock == false) {
            firstCard = this.value;
            firstCardP = this.id;
            secondCard = undefined;
            lock = true;
            cardLock = false;

        } else if (firstCardP != this.id) {
            secondCard = this.value;
            secondCardP = this.id;
            lock = false;

            if (firstCard == secondCard) {
                //trafiasz - karty znikają z gry 
                setTimeout(function () {
                    removeCards()
                }, 1000);
                if (cardLeft == 0) {
                    setTimeout(function () {
                        document.querySelector('.cardTable').innerHTML = '<h1> Gratulacje, wygrałeś grę z wynikiem ' + turnCounter + ' tur!</h1> <br /> <h2 onClick="window.location.reload()"> Jeszcze raz? </h2> ';
                    }, 1100);

                }
            } else {
                // Nie trafiasz - karty są ukrywane
                setTimeout(function () {
                    hideCard()
                }, 1000);


            }
        } else {
            firstCard = this.value;
            firstCardP = this.id;
            secondCard = undefined;
            lock = true;
            cardLock = false;
        }
    }



    function hideCard() {
        card[firstCardP.substr(4, 5)].style.backgroundImage = "url('img/overwatch.png')";
        card[secondCardP.substr(4, 5)].style.backgroundImage = "url('img/overwatch.png')";
        cardLock = false;
        turnCounter++;
        document.getElementById('score').innerHTML = "Licznik prób: " + turnCounter;
    }

    function removeCards() {
        card[firstCardP.substr(4, 5)].style.opacity = "0";
        card[secondCardP.substr(4, 5)].style.opacity = "0";
        card[firstCardP.substr(4, 5)].style.cursor = 'default';
        card[secondCardP.substr(4, 5)].style.cursor = 'default';
        cardLeft--;
        cardLock = false;
        turnCounter++;
        document.getElementById('score').innerHTML = "Licznik prób: " + turnCounter;

    }

}
