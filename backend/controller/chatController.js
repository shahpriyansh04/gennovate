const chatModel = require(`./../model/chatModel`);
const catchAsync = require(`./../util/catchAsync`);
const factory = require(`./handlerFactory`);
const AppError = require(`./../util/appError`);

exports.getAllChats = exports.getChat = factory.getAll(chatModel);
exports.postChat = factory.createOne(chatModel);
exports.deleteChat = factory.deleteOne(chatModel);
