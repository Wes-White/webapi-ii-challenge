const express = require('express');
const Data = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Data.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the data'
    });
  }
});

module.exports = router;
