const path = require('path');
const router = require('express').Router();

//Transfers the file at the given path. Sets the Content-Type response HTTP header field based on the filename’s extension.

//route to the index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//route to the animals.html
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

//route to the zoop keepers
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router;
