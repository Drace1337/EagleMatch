const express = require('express');
const authAdmin = require('../middleware/authAdmin');

const locationController = require('../controllers/locations');

const router = express.Router();

router.get('/locations', locationController.getLocations);

router.post('/location', authAdmin, locationController.createLocation);

router.delete('/location/:locationId', authAdmin, locationController.deleteLocation);

module.exports = router;