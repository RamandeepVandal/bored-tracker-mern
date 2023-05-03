const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/activityModel');
const Activity = require('../models/activityModel');

// GET
// get the activities -> get all
const getActivity = asyncHandler(async(req, res) => {
    const activity = await Activity.find({});

    if(!activity) {
        res.status(400).send('No Activities exist.')
    }

    res.status(200).json(activity);
})

// POST
// create and save activities
const setActivity = asyncHandler(async(req, res) => {
    const activity = await req.body;
    const newActicity = new Activity(activity);
    await newActicity.save();

    res.status(200).json(newActicity);
})

// DELETE
// delete activities -> id
const deleteActivity = asyncHandler(async(req, res) => {
    const id = req.params.id;
    await Activity.findByIdAndDelete(id).exec();
    res.status(200).send('Item deleted');
})

module.exports = { getActivity, setActivity, deleteActivity };