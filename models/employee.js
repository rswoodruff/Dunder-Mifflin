const mongoose = require('mongoose');

const EmployeeDetails = new mongoose.Schema(
    { 
      Employee: {
        id: Number,
        name: String,
        title: String,
        department: { 
        type: [String],
        // enum holds controlled values and all caps indicate that those const values will not change
        enum: [ 
          "SALES", 
          "CORPORATE",
          "ACCOUNTING",
          "RECEPTION",
          "HUMAN_RESOURCES"
        ],
        salary: Number,
        manager: String
      },

      }
    });

    module.exports = mongoose.model('Employee', employeeDetails);