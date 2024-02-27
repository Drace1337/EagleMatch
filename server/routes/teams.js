const express = require('express');
const authCaptain = require('../middleware/authCaptain');

const teamController = require('../controllers/teams');

const router = express.Router();

router.get('/teams', teamController.getAllTeams);

router.get('/team/:teamId', teamController.getTeam);

router.get('/teams/:userId', teamController.getUserTeams);

router.post('/team', teamController.createTeam);

router.post('/team/:teamId/user', authCaptain, teamController.addMemberToTeam);

router.put('/team/:teamId', authCaptain, teamController.updateTeam);

router.put('/team/:teamId/points', authCaptain, teamController.addPointsToTeam)

router.delete('/team/:teamId', authCaptain, teamController.deleteTeam);

router.delete('/team/:teamId/user/:userId', authCaptain, teamController.removeMemberFromTeam);


module.exports = router;