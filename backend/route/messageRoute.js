const express = require('express');
const messageController = require(`./../controller/messageController`);
const router = express.Router({ mergeParams: true });

router
  .route(`/`)
  .get(messageController.getAllMessages)
  .post(messageController.postMessage)
  .delete(messageController.deleteMessage);

router.route(`/:id`).get(messageController.getMessage);
module.exports = router;
