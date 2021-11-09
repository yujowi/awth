const { Router } = require('express');
const bodyParser = require('body-parser');
const { requireAuth } = require('../middleware/authMiddleware');

const rootController = require('../controllers/rootController');
const authController = require('../controllers/authController');

const router = Router();

// user
router.post('/auth/newUser', authController.newUser_post);
router.post('/auth/signIn', authController.signIn_post);
router.post('/auth/signOut', authController.signOut_post);

// root
router.get('/', rootController.root_get);
router.post('/', rootController.root_get);
router.get('/resource', requireAuth, rootController.resource_get);
router.post('/resource', requireAuth, rootController.resource_get);
router.use(rootController.deadEnd);

module.exports = router;
