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

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic