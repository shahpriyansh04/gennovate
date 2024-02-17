const userModel = require(`./../model/userModel`);
const catchAsync = require(`./../util/catchAsync`);
const factory = require(`./handlerFactory`);
const AppError = require(`./../util/appError`);

exports.getUser = factory.getAll(userModel);
exports.postUser = factory.createOne(userModel);
exports.deleteUser = factory.deleteOne(userModel);
module.exports;
