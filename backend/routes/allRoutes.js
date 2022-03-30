const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user/userController');
const stateCtrl = require('../controllers/state/stateController');
const districtCtrl = require('../controllers/district/districtController');
const childCtrl = require('../controllers/childProfile/childController');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

const jwtAuth = require('../middleware/Auth');

//USER API'S
router.post('/user/add', userCtrl.userAdd);  //add new user
router.post('/user/login', userCtrl.userLogin);  //login user
router.get('/user/logout', jwtAuth, userCtrl.userLogout); //logout user

//STATE API'S
router.post('/state/create',jwtAuth, stateCtrl.createState ); //create new state
router.get('/master/get-state', jwtAuth, stateCtrl.getState); //get all states

//DISTRICT API'S
router.post('/district/create',jwtAuth, districtCtrl.createDistrict); //create district
router.get('/master/get-district', jwtAuth, districtCtrl.getDistrict); // get all districts

//CHILD API'S
router.post('/beneficiary/child-profile-create',jwtAuth, childCtrl.createChildProfile); //create Child Profile
router.get('/beneficiary/get-child-profile',jwtAuth, childCtrl.getChildProfile); // get Child Profile


module.exports = router;