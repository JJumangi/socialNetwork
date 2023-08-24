const {User, Thought} = require('../models');

const userControl = {
  //all users
  async getUsers(req, res) {
    try {
      const userData = await User.find().select('-__v');
      res.json(userData);
    }catch (err) {
      res.status(500).json(err);
    }
  },
  //get specific user and its id, populate thoughts and friends
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({_id: req.params.userId})
      .select('-__v')
      .populate('thoughts')
      .populate('friends');

      if (!userData) {
        return res.status(404).json({ message: "No user with that Id"});
      }
      res.json(userData);
    }catch (err) {
      res.status(500).json(err);
    }
  },
  //post/create new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
//update user
async updateUser(req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      {_id: req.params.courseId},
      {$set: req.body},
      {runValidators: true, new: true}
    );
    if(!userData) {
      return res.status(404).json({ message: 'No user with that Id'});
    }
    res.json(userData) 
    } catch (err) {
      res.status(500).json(err);
    }
},
//delete user and thoughts
async deleteUser(req, res) {
  try {
    const userData = await User.findOneandDelete(
      {_id: req.params.userId}
    )
    if (!userData) {
      return res.status(404).json({ message: 'No user with that Id'});
    }
    await Thought.deleteMany({_id: {$in: userData.thoughts}});
    res.json({ message: 'User and Thoughts deleted'})
  }catch (err) {
    res.status(500).json(err);
  }
}
};