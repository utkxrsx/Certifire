const express = require('express');
const multer = require('multer');
const Certificate = require('../models/Certificate');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload certificate (Admin only)
router.post('/upload', authMiddleware, upload.single('certificate'), async (req, res) => {
  const { certId, studentName, internshipDomain, startDate, endDate } = req.body;
  const filePath = req.file.path;

  try {
    const newCert = new Certificate({
      certId,
      studentName,
      internshipDomain,
      startDate,
      endDate,
      filePath
    });
    console.log('Saving cert with ID:', certId);
    await newCert.save();
    res.json({ msg: 'Certificate uploaded successfully' });
    console.log('Saved cert:', saved);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get certificate by ID
router.get('/:certId', async (req, res) => {
  const { certId } = req.params;

  try {
    const certificate = await Certificate.findOne({ certId });
    if (!certificate) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

