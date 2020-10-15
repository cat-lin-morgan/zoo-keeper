const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));//this tells it to parse the data as deeply as it can
//parse incoming json data
app.use(express.json());

//filters thru each animal ny either diet, species, or name
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //save personalityTraits as an array and if its a string place it into the array and then save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loos thru each trait in the personality array
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter( animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }

    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

//fitlers thru the animals by what number they are in the array
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal (body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}

//validatethat each input is correct
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

//these are routes, their order matters
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }

    res.json(results);
});

//para route must come after the above type of route
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//this 'post' the incoming data
app.post('/api/animals', (req, res) => {
    //sets id based on the next index of the animal array
    req.body.id = animals.length.toString();

    //validate or send a 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted');
    } else {
        //adding animals to the json file
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

//this can go anywhere after the globals, but is best practice here
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});