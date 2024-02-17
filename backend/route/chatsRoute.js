const express = require('express');
const chatController = require(`../controller/chatController`);
const messageRouter = require(`../route/messageRoute`);
const router = express.Router({ mergeParams: true });

router.use(`/:chatId/message`, messageRouter);
router.get('/getUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all chat messages where the user field matches the provided user ID
    const chats = await Chat.find({ user: userId });

    if (!chats || chats.length === 0) {
      return res
        .status(404)
        .json({ message: 'No chats found for the provided user ID' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        chats
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router
  .route(`/`)
  .get(chatController.getAllChats)
  .post(chatController.postChat);

router
  .route(`/:id`)
  .get(chatController.getChat)
  .delete(chatController.deleteChat);
module.exports = router;
