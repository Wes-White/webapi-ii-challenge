const express = require('express');
const Data = require('../db');

const router = express.Router();

//GET

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

router.get('/:id', async (req, res) => {
  try {
    const post = await Data.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        success: false,
        message: 'The post with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'The information could not be retrieved.'
    });
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Data.findPostComments(req.body);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({
        success: false,
        message: 'The post with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'The comments information could not be retrieved.'
    });
  }
});

//POST

router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const newPost = await Data.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({
        success: false,
        message: 'Please provide the title and contents for the post.'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'There was an error while saveing the post to the database.'
    });
  }
});

//DELETE

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Data.remove(id);
    if (deletedPost) {
      res.status(200).json({ message: 'The requested post has been removed.' });
    } else {
      res.status(404).json({
        success: false,
        message: 'The post with the specified ID does not exist.'
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'The post could not be removed.' });
  }
});

//PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    if (title && contents) {
      const updatedPost = await Data.update(id, req.body);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.'
        });
      }
    } else {
      res.status(400).json({
        success: false,
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'The post information could not be modified.'
    });
  }
});

module.exports = router;
