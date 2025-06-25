const mongoose = require('mongoose');

  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,  
        // useUnifiedTopology: true  
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      console.error(`Error details: ${error.stack}`);
      process.exit(1);
    }
  };
  

module.exports = connectDB;
