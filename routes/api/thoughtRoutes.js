const router = require('express').Router();

//thoughts
router.route('/').get()
//specific thought
router.route('/thoughtId').get()
//add reaction
router.route('thoughtId/reactions').post()
//delete reaction
router.route('thoughtId/reactions/:reactionsId').delete()

module.exports = router;