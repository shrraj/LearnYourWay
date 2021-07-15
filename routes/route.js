const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authController = require('../controllers/controller');
const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPass', authController.forgotPass);
router.get('/home', authenticate, authController.home);
router.get('/dashboard', authenticate, authController.dashboard);
router.post('/testans', authenticate, authController.testans);
router.post('/result', authenticate, authController.result);
router.post('/testAnalysis', authenticate, authController.testAnalysis);
router.get('/signout', authController.signout);

module.exports = router;