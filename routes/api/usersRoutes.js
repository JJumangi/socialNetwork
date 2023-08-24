const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userControl');
//api/

//get all users
router.route('/').get(getUser).post(createUser);
//get single user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;