async function fetchCards(cardType) {
    let res = await fetch(`http://127.0.0.1:5000/type?cardType=${cardType}`);
    let cards = await res.json();
    return cards;
}

function defaultCase(){
    let imgs = document.getElementsByTagName('img')
    for(let img of imgs){
        if(img.classList.contains("Show")){
            img.classList.remove("Show");
            img.classList.add("Hide");
        }
    }

}

function hideCards(cardType) {
    let sortSelected = false;
    let sorts = document.querySelectorAll(".sort")

    for(let i = 0; i <sorts.length; i++){
        if(sorts[i].classList.contains("selected")){
            console.log("A CLASS IS SELECTED")
            sortSelected = true;
            console.log(sortSelected);
        }
    }

    let cards = document.querySelector("#cards");
    if(sortSelected === true){
        cards.classList.add("hide-all");
        cards.classList.remove("show-all");
    } else {
        cards.classList.add("show-all");
        cards.classList.remove("hide-all");
    }
    
    fetchCards(cardType).then((cardList) => {
        for(let cardName of cardList) {
            console.log("card", cardName)
            let selectedCard = document.getElementById(cardName);
            if (selectedCard?.classList.contains("Show")) {
                selectedCard.classList.add("Hide");
                selectedCard.classList.remove("Show");  
            } else {
                selectedCard?.classList.remove("Hide");    
                selectedCard?.classList.add("Show");
            }
        }
    })

}


//
let categories = document.getElementsByClassName('categories');
let type = document.getElementsByClassName('type');

for(let i=0; i <categories.length;i++){
    categories[i].addEventListener('click', function(){
        playerSelect(event);
    })
}

for(let i=0; i <type.length;i++){
    type[i].addEventListener('click', function(){
        playerSelect(event);
        
    })
}

function playerSelect(event) {
    let btn = event.target;
    if(!btn.classList.contains("selected")){
        btn.classList.add("selected");
        btn.classList.remove("deselected");
        
    } else {
        btn.classList.add("deselected");
        btn.classList.remove("selected");
    }
}

let attackBTN = document.querySelector("#attack");
attackBTN.addEventListener('click', () => hideCards("attack"));

let actionBTN = document.querySelector("#action");
actionBTN.addEventListener('click', () => hideCards("action"));

let durationBTN = document.querySelector("#duration");
durationBTN.addEventListener('click', () => hideCards("duration"));

let victoryBTN = document.querySelector("#victory");
victoryBTN.addEventListener('click', () => hideCards("victory"));

let treasureBTN = document.querySelector("#treasure");
treasureBTN.addEventListener('click', () => hideCards("treasure"));

let reactionBTN = document.querySelector("#reaction");
reactionBTN.addEventListener('click', () => hideCards("reaction"));

let villageBTN = document.querySelector("#village");
villageBTN.addEventListener('click', () => hideCards("village"));

let cantripBTN = document.querySelector("#cantrip");
cantripBTN.addEventListener('click', () => hideCards("cantrip"));

let gainerBTN = document.querySelector("#gainer");
gainerBTN.addEventListener('click', () => hideCards("gainer"));

let trasherBTN = document.querySelector("#trasher");
trasherBTN.addEventListener('click', () => hideCards("trasher"));

let sifterBTN = document.querySelector("#sifter");
sifterBTN.addEventListener('click', () => hideCards("sifter"));

let terminalDrawBTN = document.querySelector("#terminalDraw");
terminalDrawBTN.addEventListener('click', () => hideCards("terminalDraw"));

let terminalSilverBTN = document.querySelector("#terminalSilver");
terminalSilverBTN.addEventListener('click', () => hideCards("terminalSilver"));