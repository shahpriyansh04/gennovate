const messageModel = require(`./../model/messageModel`);
const catchAsync = require(`./../util/catchAsync`);
const factory = require(`./handlerFactory`);
const AppError = require(`./../util/appError`);

exports.getAllMessages = exports.getMessage = factory.getAll(messageModel);
exports.postMessage = factory.createOne(messageModel);
exports.deleteMessage = factory.deleteOne(messageModel);
