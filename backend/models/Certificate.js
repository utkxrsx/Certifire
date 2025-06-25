const mongoose = require('mongoose');

// Define the Certificate schema
const certificateSchema = new mongoose.Schema({
  certId: { 
    type: String, 
    required: [true, 'Certificate ID is required'], 
    unique: true, 
    trim: true 
  },
  studentName: { 
    type: String, 
    required: [true, 'Student name is required'], 
    trim: true 
  },
  internshipDomain: { 
    type: String, 
    required: [true, 'Internship domain is required'], 
    trim: true 
  },
  startDate: { 
    type: Date, 
    required: [true, 'Start date is required'] 
  },
  endDate: { 
    type: Date, 
    required: [true, 'End date is required'], 
    validate: {
      validator: function(value) {
        return value >= this.startDate;
      },
      message: 'End date must be greater than or equal to the start date'
    }
  },
  filePath: { 
    type: String, 
    required: [true, 'File path is required'] 
  }
}, 
{
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Middleware: Runs before saving a certificate document
certificateSchema.pre('save', function (next) {
  console.log(`Saving certificate for: ${this.studentName}`);
  next();
});

// Create a Certificate model
const Certificate = mongoose.model('Certificate', certificateSchema);

// Export the Certificate model
module.exports = Certificate;
