const express = require('express');
const authCaptain = require('../middleware/authCaptain');
const authAdmin = require('../middleware/authAdmin');
const teamController = require('../controllers/teams');
const authUser = require('../middleware/authUser');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '-' + file.originalname)
	},
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}


const upload = multer({ storage: storage, fileFilter: fileFilter })

const router = express.Router();

router.get('/teams', teamController.getAllTeams);

router.get('/team/:teamId', teamController.getTeam);

router.post('/team', upload.single('logo'), authUser, teamController.createTeam);

// router.post('/team', teamController.createTeam);


router.post('/team/:teamId/user', authCaptain, teamController.addMemberToTeam);

router.patch('/team/:teamId', authCaptain, teamController.updateTeam);

router.patch('/team/:teamId/points', authAdmin, teamController.addPointsToTeam)

router.delete('/team/:teamId', authCaptain, teamController.deleteTeam);

router.delete('/team/:teamId/user/:userId', authCaptain, teamController.removeMemberFromTeam);


module.exports = router;