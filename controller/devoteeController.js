const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Devotee = require("../models/Devotee");

exports.registerDevotee = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    whatsappNo,
    age,
    roundsChanting,
    country,
    city,
    role,
    mentor,
    language,
    description,
  } = req.body;
  await Devotee.create({
    name,
    email,
    whatsappNo,
    age,
    roundsChanting,
    country,
    city,
    role,
    mentor,
    language,
    description,
  });
  res.status(200).json({
    success: true,
  });
});

exports.getAllDevotees = catchAsyncError(async (req, res, next) => {
  const devotees = await Devotee.find();
  res.status(200).json({
    devotees,
  });
});

exports.getDevoteesDetails = catchAsyncError(async (req, res, next) => {
  const devotee = await Devotee.findById({ _id: req.params.id });
  res.status(200).json({
    devotee,
  });
});

exports.updateDevotee = catchAsyncError(async (req, res, next) => {
  let devotee = await Devotee.findById({ _id: req.params.id });
  if (!devotee) {
    return next(new ErrorHandler("devotee not found", 404));
  }
  devotee = await Devotee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    devotee,
  });
});

exports.deleteDevotee = catchAsyncError(async (req, res, next) => {
  const devotee = await Devotee.findById({ _id: req.params.id });
  await devotee.remove();
  res.status(200).json({
    success: true,
    message: "Devotee is deleted successfully",
  });
});
