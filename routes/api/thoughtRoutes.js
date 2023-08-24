const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtControl');

// all thoughts
router.route('/').get(getThought).post(createThought);
//specific thought 
router.route('/thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
//add reaction
router.route('thoughtId/reactions').post(createReaction);
//delete reaction
router.route('thoughtId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;