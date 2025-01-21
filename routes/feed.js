const express = require('express');
const route = express.Router();
const feedController = require('../controller/feed');
const { body, param } = require("express-validator");

route.get('/', feedController.getFeeds);
route.get('/:id', feedController.getByFeed);
route.post('/',
    [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Title is required")
            .isLength({ min: 3 })
            .withMessage("Title must be at least 3 characters long"),
    ],
    feedController.postFeeds);
route.put('/:id', feedController.updateFeeds);
route.delete('/:id', feedController.deleteFeed);

module.exports = route
