// collaborationRoutes.js
const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');

router.post('/:id/share', collaborationController.shareDocument);
router.post('/:id/unshare', collaborationController.unshareDocument);
router.get('/:id/collaborators', collaborationController.getCollaborators);

module.exports = router;
