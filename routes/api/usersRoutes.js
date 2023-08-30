const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userControl');
//api/

//get all users
router.route('/').get(getUsers).post(createUser);
//get single user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;