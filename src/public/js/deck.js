const [expansion, cards] = document.querySelectorAll('select');
const quantity = document.querySelector('input');
const [setReino, setSide] = document.querySelectorAll('button');
const reinoContainer = document.querySelector('.reino');
const sidedeckContainer = document.querySelector('.sidedeck');
const bovedaContainer = document.querySelector('.boveda');
const reinoCardCounter = document.querySelector('.cantidad-reino');
const sidedeckCounter = document.querySelector('.cantidad-sidedeck');


const form = document.querySelector('form');

const genericCounter = bovedaContainer.children[1].firstElementChild;
genericCounter.readOnly = true;

let reinoQuantity = 0;
let sideQuantity = 0;
let genericQuantity = 15;
let sacred = 0;
let currentDeck = [];
let currentSide = [];

const cardsData = await fetch('https://kraken-tournaments.onrender.com/api/cards').then(data => data.json());

cardsData.sort((a,b) => a-b)

expansion.addEventListener('change', () => {
    while (cards.childElementCount > 1) cards.lastElementChild.remove()

    const expansionCards = cardsData.filter(card => card.expansion == expansion.value)

    expansionCards.forEach(card => {
        const cardOption = document.createElement('option');
        cardOption.textContent = card.name;
        cards.appendChild(cardOption);
    })
})

setReino.addEventListener('click', () => {

    // DESPUÉS VEO LAS COMPROBACIONES, ASUMAMOS QUE SE VAN A INSCRIBIR CON SERIEDAD
    const { type, _id, tribes } = cardsData.find(card => card.name == cards.value);
    const cardName = cards.value;

    const cardData = document.createElement('p');
    cardData.className = 'card-data';

    const cardQuantity = document.createElement('input');
    cardQuantity.type = 'number';
    cardQuantity.valueAsNumber;
    cardQuantity.value = 1;
    cardQuantity.min = 1;
    cardQuantity.name = _id;

    const deleteCard = document.createElement('button');
    deleteCard.innerHTML = 'Eliminar';
    deleteCard.className = 'delete-card'

    deleteCard.addEventListener('click', (e) => {
        e.preventDefault()
        currentDeck = currentDeck.filter((card) => card != _id)
        if (type == 'TESORO') {
            genericQuantity += 1
            genericCounter.value = genericQuantity;
            genericCounter.max = genericQuantity;
        }
        e.target.parentNode.remove()
        reinoQuantity-=cardQuantity.value
        reinoCardCounter.innerText = `Cartas : ${reinoQuantity}`

    })

    if (!currentDeck.includes(_id)) {
        currentDeck.push(_id)

        let currentQuantity = parseInt(cardQuantity.value)
        if (type != 'TESORO') {
            reinoQuantity += 1;
            reinoCardCounter.innerText = `Cartas : ${reinoQuantity}`
            if (reinoQuantity == 67) {
                alert('llegaste al maximo de cartas para el reino')
                // VER COMO CONGELAR LAS CANTIDADES DE CARTAS
            }
            cardQuantity.addEventListener('change', (e) => {
                
                const newQuantity = parseInt(e.target.value)
                
                if (reinoQuantity == 67) {
                    alert('llegaste al maximo de cartas para el reino')
                    
                }
                if (newQuantity > currentQuantity) {
                    reinoQuantity += (newQuantity - currentQuantity)
                }
                if (newQuantity < currentQuantity) {
                    reinoQuantity -= (currentQuantity - newQuantity)
                }
                currentQuantity = newQuantity
                reinoCardCounter.innerText = `Cartas : ${reinoQuantity}`
            });

            reinoContainer.appendChild(cardData).innerHTML = `${cardName} x `;

            cardData.appendChild(cardQuantity).name = _id;
            cardData.appendChild(deleteCard);

            cardQuantity.max = 4;
        }
        else {
            if(tribes.includes('SAGRADO')){

                sacred+=1
                if(sacred >= 3) alert('este es tu ultimo tesoro sagrado')
            }
            bovedaContainer.appendChild(cardData).innerHTML = cardName;
            cardData.appendChild(cardQuantity).name = _id;
            cardData.appendChild(deleteCard);

            cardQuantity.max = 1;
            cardQuantity.readOnly = true;
            genericQuantity -= 1;
            genericCounter.max = genericQuantity;
            genericCounter.value = genericQuantity;
        }
    }else{
        alert('llegaste al maximo de cartas para el reino')
    }
})

setSide.addEventListener('click', ()=>{
    const { _id } = cardsData.find(card => card.name == cards.value);
    const cardName = cards.value;

    const cardData = document.createElement('p');
    cardData.className = 'card-data';

    const cardQuantity = document.createElement('input');
    cardQuantity.type = 'number';
    cardQuantity.valueAsNumber;
    cardQuantity.value = 1;
    cardQuantity.min = 1;
    cardQuantity.name = _id;

    const deleteCard = document.createElement('button');
    deleteCard.innerHTML = 'Eliminar';
    deleteCard.className = 'delete-card'

    deleteCard.addEventListener('click', (e) => {
        e.preventDefault()
        currentSide = currentSide.filter((card) => card != _id)
        if (type == 'TESORO') {
            genericQuantity += 1
            genericCounter.value = genericQuantity;
            genericCounter.max = genericQuantity;
        }
        e.target.parentNode.remove()
        sideQuantity-=cardQuantity.value
        sidedeckCounter.innerText = `Cartas : ${sideQuantity}`
    })
    
})

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const deckData = {cards:
        []
    };
    const finalDeck = document.querySelectorAll('input[type=number]')
    finalDeck.forEach(node=>{
        deckData.cards.push({
            card: node.name,
            quantity: node.value
        })
    })

    console.log(deckData)

    fetch('http://localhost:8080/api/decks/register',{
        method: 'POST',
        body: JSON.stringify(deckData),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(data=> data.json()).then(data=>console.log(data))
})
