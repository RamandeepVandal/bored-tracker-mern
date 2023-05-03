const express = require('express');
const { getActivity, setActivity, deleteActivity } = require('../controllers/activityController');

const router = express.Router();

// get and set
router.route('/').get(getActivity).post(setActivity);
// delete
router.route('/:id').delete(deleteActivity);

module.exports = router;