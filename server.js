const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

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

//these are routes
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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});