const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals");
const { animals } = require('../../data/animals.json');

//these are routes, their order matters
//query route must come first
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }

    res.json(results);
});

//param route must come after the above type of route
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//this 'post' the incoming data
router.post('/animals', (req, res) => {
    //sets id based on the next index of the animal+ array
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

module.exports = router;
