// documentController.js

const Document = require('../models/documentModel');

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createDocument = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { title, type } = req.body; // Ensure to destructure type as well
    const response = await Document.create({ title, type }); // Use create method directly
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateDocument = async (req, res) => {
  try {
    const {content} = req.body;
    const document = await Document.findByIdAndUpdate(req.params.id, { content }, { new: true });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
