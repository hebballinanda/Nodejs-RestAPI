const { validationResult } = require("express-validator");
const Feed = require('../models/feed');

// Get all feeds
exports.getFeeds = (req, res, next) => {
    Feed.find()
        .then(feeds => {
            res.status(200).json({ data: feeds });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Get all feeds
exports.getByFeed = (req, res, next) => {
    const feedId = req.params.id;
    Feed.findById(feedId)
        .then(feeds => {
            res.status(200).json({ data: feeds });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Add a new feed
exports.postFeeds = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error('Validation failed');
        err.statusCode = 422;
        throw err;
    }

    const { title } = req.body;
    const feed = new Feed({ id: new Date().toISOString(), title });

    feed.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Delete a feed by ID
exports.deleteFeed = (req, res, next) => {
    const deleteId = req.params.id;

    Feed.findByIdAndDelete(deleteId)
        .then(result => {
            if (!result) {
                const error = new Error('Feed not found.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Feed Deleted Successfully!",
                data: result,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// Update a feed by ID
exports.updateFeeds = (req, res, next) => {
    const updateId = req.params.id;
    const { title } = req.body;

    Feed.findById(updateId)
        .then(feed => {
            if (!feed) {
                const error = new Error('Feed not found.');
                error.statusCode = 404;
                throw error;
            }
            feed.title = title;

            return feed.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Feed Updated Successfully!",
                data: result,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
