const express = require('express');
const userController = require(`./../controller/userController`);
const chatRouter = require(`./chatsRoute`);
const router = express.Router({ mergeParams: true });

router.use(`/:userId/chat`, chatRouter);

router.route(`/`).post(userController.postUser);
router
  .route(`/:id`)
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
