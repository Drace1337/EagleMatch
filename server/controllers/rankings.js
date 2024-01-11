const {validationResult} = require('express-validator');

const User = require('../models/user');
const Team = require('../models/team');
const Ranking = require('../models/ranking');

exports.createTeamRanking = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const teamId = req.body.teamId;
    const ranking = req.body.ranking;
    const team = await Team.findById(teamId);
    if (!team) {
        const error = new Error('Could not find team.');
        error.statusCode = 404;
        throw error;
    }
    const user = await User.findById(req.userId);
    if (user.roles !== 'captain') {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
    }
    const teamRanking = new Ranking({
        ranking: ranking,
        team: teamId,

    });
    try {
        await teamRanking.save();
        team.rankings.push(teamRanking);
        await team.save();
        res.status(201).json({
            message: 'Team ranking created successfully!',
            ranking: teamRanking,
            team: { _id: team._id, name: team.name },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}