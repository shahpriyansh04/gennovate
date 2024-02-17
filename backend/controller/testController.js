const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const sharp = require('sharp');

exports.putOne = async (req, res, next) => {
  try {
    const query = req.body;

    const response = await axios.post('http://127.0.0.1:3000/api/box', {
      query: query
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).json({ error: 'Error calling Flask API' });
  }
  next();
};
