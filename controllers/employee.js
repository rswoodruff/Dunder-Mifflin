const path = require('path');
//const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EmployeeDetails = require('../models/employee');


// CREATE

exports.createEmployeeDetails = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
  
    const publishedemployeeDetails = await EmployeeDetails.findOne({ user: req.user.id });
  
    if (publishedemployeeDetails && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `The user with ID ${req.user.id} has already published a bootcamp`,
          400
        )
      );
    }
    const employee = await EmployeeDetails.create(req.body);

  res.status(201).json({
    success: true,
    data: employee
  });
});

// READ

// get bootcamp by id from model
exports.getEmployeeDetails = asyncHandler(async (req, res, next) => {
  const employee = await EmployeeDetails.findById(req.params.id);

// respond with data
  res.status(200).json({ success: true, data: employee });
});

// UPDATE

exports.updateEmployeeDetails = asyncHandler(async (req, res, next) => {
    let employee = await EmployeeDetails.findById(req.params.id);
  
    if (!employee) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    if (employee.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }
  
    employee = await EmployeeDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({ success: true, data: employee });
  });

// DELETE

exports.deleteEmployeeDetails = asyncHandler(async (req, res, next) => {
    const employee = await EmployeeDetails.findById(req.params.id);
  
    if (!employee) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    if (employee.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this bootcamp`,
          401
        )
      );
    }
  
    await employee.remove();
  
    res.status(200).json({ success: true, data: {} });
  });


exports.mongoose.model = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

