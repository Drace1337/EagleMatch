const express = require('express');
const authUser = require('../middleware/authUser');

const rankingController = require('../controllers/rankings');

const router = express.Router();

router.get('/goals', rankingController.getGoalsRanking);

router.get('/assists', authUser, rankingController.getAssisstsRanking);

router.get('/clean-sheets', authUser, rankingController.getCleanSheetsRanking);

router.get('/teams', authUser, rankingController.getTeamsRanking);

module.exports = router;