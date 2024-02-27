const User = require('../models/user');
const Team = require('../models/team');

exports.getGoalsRanking = async (req, res, next) => {
    try {
        const users = await User.find({}, 'name goals').sort({ goals: -1 });
        res.status(200).json({ message: 'Fetched goals ranking.', users: users });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getAssisstsRanking = async (req, res, next) => {
    try {
        const users = await User.find({}, 'name assists').sort({ assists: -1 });
        res.status(200).json({ message: 'Fetched assists ranking.', users: users });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getCleanSheetsRanking = async (req, res, next) => {
    try {
        const users = await User.find({}, 'name cleanSheets').sort({ cleanSheets: -1 });
        res.status(200).json({ message: 'Fetched clean sheets ranking.', users: users });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getTeamsRanking = async (req, res, next) => {
    try {
        const teams = await Team.find({}, 'name points').sort({ points: -1 });
        res.status(200).json({ message: 'Fetched teams ranking.', teams: teams });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}