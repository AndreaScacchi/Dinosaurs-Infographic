 // Create Dino Constructor
function DinosConstructor(species, weight, height, diet, where, when, fact, image) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = image;
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


    // On button click, prepare and display infographic
    document.getElementById('btn').addEventListener('click',(event) => {
        // Use IIFE to get human data from form
        (function humanData(e) {
            human.name = document.getElementById('name').value,
            human.feet = document.getElementById('feet').value,
            human.inches = document.getElementById('inches').value,
            human.weight = document.getElementById('weight').value,
            human.diet = document.getAnimations('diet').value
        })();

        dinosaurs.forEach((dino) => {
            dino.heightFact = dino.compareHeight(human);
            dino.weightFact = dino.compareWeight(human);
            dino.dietFact = dino.compareDiet(human);
            dino.where = `The ${dino.species} inhabited in ${dino.where}.`;
            dinos.when = `The ${dinos.species} inhabited in the ${dino.when}.`
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


    //Convert human height to inches to allow comparison to dinosaurs height



    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

    // Remove form from screen


// Validate the form data to ensure the data is acceptable and complete.


// Move the tile colors from CSS to JS for more control.


// Randomize the order of the tiles while keeping the human in the middle.


// Create a hover state on the tiles that displays the rest of the species statistics.


// Create a "Try again button"
