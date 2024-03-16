const {validationResult} = require('express-validator')

const Location = require('../models/location')

exports.getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find()
        res.status(200).json({
            message: 'Fetched locations successfully.',
            locations: locations,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createLocation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422
        throw error
    }
    const name = req.body.name
    const address = req.body.address
    const location = new Location({
        name: name,
        address: address,
    })
    try {
        await location.save()
        res.status(201).json({
            message: 'Location created successfully!',
            location: location,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteLocation = async (req, res, next) => {
    const locationId = req.params.locationId
    try {
        const location = await Location.findById(locationId)
        if (!location) {
            const error = new Error('Could not find location.')
            error.statusCode = 404
            throw error
        }
        await Location.findByIdAndDelete(locationId)
        res.status(200).json({ message: 'Location deleted.' })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}