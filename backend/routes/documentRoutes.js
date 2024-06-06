const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);
router.post('/create', documentController.createDocument);
router.put('/:id/update', documentController.updateDocument);
router.delete('/:id/delete', documentController.deleteDocument);

module.exports = router;