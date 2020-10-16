const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalsRoutes');


//this is a central hub for all routing functions we may want to add to the application

router.use(animalRoutes);
router.use(require('./zookeeperRoutes'));

module.exports = router;