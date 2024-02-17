const express = require('express');
const router = express.Router();
module.exports = router;

const testController = require(`./../controller/testController`);

router.use(`/black-box`, async (req, res, next) => {
  const { query } = req.query;

  try {
    const url = 'http://localhost:5000/api/box';
    const response = await axios.get(url, {
      params: { query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
  next();
});
