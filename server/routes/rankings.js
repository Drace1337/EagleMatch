const express = require('express');
const authUser = require('../middleware/authUser');
const authAdmin = require('../middleware/authAdmin');

const rankingController = require('../controllers/rankings');

const router = express.Router();

router.get('/goals', rankingController.getGoalsRanking);

router.get('/assists', authUser, rankingController.getAssisstsRanking);

router.get('/clean-sheets', authUser, rankingController.getCleanSheetsRanking);

router.get('/teams', authUser, rankingController.getTeamsRanking);

router.patch('/reset', authAdmin, rankingController.resetRankings);

module.exports = router;