 // Create Dino Constructor
function DinosConstructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = encodeURI('images/' + species.toLowerCase() + '.png');
}


// Get dinosaurs data from JSON
const dinoData = async() => {
    const response = await fetch('./dino.json');
    const data = await response.json();
    return data.Dinos;
}


// Create Dino Objects
const dinosaurs = [];

dinoData().then(data => {
    const dinos = data;
    dinos.forEach((dino) => {
        const dinosObject = new DinosConstructor(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact,
            dino.image
        );
        dinosaurs.push(dinosObject);
    });
}); 


// Create Human Object
const human = {
    image:'images/human.png',
    species: 'Human'
};


// User Input
let yourName = document.getElementById('name');
let meterOrFeet = document.getElementById('meterOrFeet');
let cmOrInches = document.getElementById('cmOrInches');
let weight = document.getElementById('weight');



// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click',(event) => {

    const letters = /^[A-Za-z]+$/;
    if(!yourName.value.match(letters)) {
        alert('Please insert a name!');
        return false;
    }

    // Validate the form data to ensure the data is acceptable and complete
    if(yourName.value == "" || meterOrFeet.value == "" || cmOrInches.value == "" || weight.value == "") {
        alert('Please fill out all the form!');
        return false;
    }

    // Use IIFE to get human data from form
    (function humanData(e) {
        human.name = document.getElementById('name').value,
        human.feet = document.getElementById('meterOrFeet').value,
        human.inches = document.getElementById('cmOrInches').value,
        human.weight = document.getElementById('weight').value,
        human.diet = document.getAnimations('diet').value
    })();

    dinosaurs.forEach((dino) => {
        dino.heightFact = dino.compareHeight(human);
        dino.weightFact = dino.compareWeight(human);
        dino.dietFact = dino.compareDiet(human);
        /*dino.where = `The ${dino.species} inhabited in ${dino.where}.`;*/
        dino.where = dino.compareLocation(human);
        dino.when = `The ${dino.species} inhabited in the ${dino.when}.`
    });

    const dinoSlice1 = dinosaurs.slice(0, 4);
    const dinoSlice2 = dinosaurs.slice(4, 8);
    const dinoHumanSpecies = dinoSlice1.concat(human, dinoSlice2);

    // Add tiles to DOM
    dinoHumanSpecies.forEach((item) => {
        generateTiles(item);
    });

    deleteForm();

    tryAgainButton();
});


// Create Dino Compare Method 1
DinosConstructor.prototype.compareHeight = function() {
    const humanHeight = human.height;
    const dinosaurHeight = this.height;

    if(humanHeight > dinosaurHeight) {
        return `${this.species} was shorter than you. It was ${this.height} centimeter tall.!`
    } else if(humanHeight < dinosaurHeight) {
        return `${this.species} was taller than you. It was ${this.weight} centimeter tall.!`
    } else if(humanHeight == dinosaurHeight) {
        return `${this.species} was as tall as you.!`
    }
};


// Create Dino Compare Method 2
DinosConstructor.prototype.compareWeight = function() {
    const humanWeight = human.weight;
    const dinosaurWeight = this.weight;

    if(humanWeight > dinosaurWeight) {
        return `${this.species} was lighter than you. It weighed ${this.weight} kg.!`
    }else if(humanWeight < dinosaurWeight) {
        return `${this.species} was heavier than you. It weighed ${this.weight} kg.!`
    }else if(humanWeight == dinosaurWeight) {
        return `${this.species} weighed like you.!`
    }
};


// Create Dino Compare Method 3
DinosConstructor.prototype.compareDiet = function() {
    const humanDiet = human.diet;
    const dinosaurDiet = this.diet;

    if(humanDiet == dinosaurDiet) {
        return `${this.species} had the same diet as you. You are both ${human.diet}.!`
    } else {
        return `Contrary to you, ${this.species} was a ${this.diet}.!`
    }
};


// Create Dino Compare Method 4
DinosConstructor.prototype.compareLocation = function() {
    const humanLocation = human.where;
    const dinosaurLocation = this.where;

    if(humanLocation == dinosaurLocation) {
        return `${this.species} lived in the same place where you live, or rather ${this.where}.!`
    } else {
        return `Unlike you, ${this.species} lived in ${this.where}.!`
    }
};


// Generate Tiles for each Dino in Array
const dinographic = document.querySelector('main');

const generateTiles = function(dino) {
    const tiles = document.createElement('div');
    tiles.classList.add('tile');
    if(dino.species === 'Human') {
        tiles.innerHTML = `<h4>${dino.name}</h4>`
    }else if(dino.species === 'Pigeon') {
        tiles.innerHTML = `<h4>${dino.species}</h4>`;
        tiles.innerHTML += `<p>${dino.fact}</p>`
    }else {
        tiles.innerHTML = `<h4>${dino.species}</h4>`;
        const fact = randomFacts(dino);
        tiles.innerHTML += `<p>${fact}</p>`
    }
    tiles.innerHTML += `<img src= ${dino.image}>`;
    dinographic.appendChild(tiles);

    //Move the tile colors from CSS to JS for more control.
    //tiles.style.background = 'linear-gradient(0deg,rgb(0, 119, 255) 0%, rgb(14, 13, 13) 100%)';
;}


// Randomize the order of the tiles while keeping the human in the middle.
const randomFacts = function(item) {
    const facts = ['fact', 'heightFact', 'weightFact', 'dietFact', 'where', 'when'];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    return item[randomFact];
};


// Remove form from screen
function deleteForm() {
    const form = document.getElementById('dino-compare');
    form.style.display = 'none';
};


// Create a "Try again button"
const tryAgainButton = function() {
    const button = document.createElement('button');
    button.innerHTML = `Try Again!`;
    dinographic.appendChild(button);
    document.querySelector('button').addEventListener('click', (event) => {
        window.setTimeout(() => {
            window.location.reload();
        }, 100);
    })
}
