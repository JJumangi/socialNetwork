const {User, Thought} = require('../models');

const thoughtControl = {

    //all thoughts
    async getThought(req, res) {
      try {
        const thoughtData = await Thought.find().select('-__v');
        res.json(thoughtData);
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    //get specific thought and its id,
    async getSingleThought(req, res) {
      try {
        const thoughtData = await Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')

  
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought with that Id"});
        }
        res.json(thoughtData);
      }catch (err) {
        res.status(500).json(err);
      }
    },
    //create/post new thought, push created thoughts id to assoc. user thought
    async createThought(req, res) {
      try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
          {_id: req.body.userId},
          {$push: { thoughts: thoughtData._id}},
          {new: true}
        );
        if (!userData) {
          return res.status(404).json({ message: 'No user with this Id'});
        }

        res.json({ message: 'Thought created'});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  //update thought by id
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        {_id: req.params.courseId},
        {$set: req.body},
        {runValidators: true, new: true}
      );
      if(!thoughtData) {
        return res.status(404).json({ message: 'No thought with that Id'});
      }
      res.json(thoughtData) 
      } catch (err) {
        res.status(500).json(err);
      }
  },
  //delete thought by id
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneandDelete(
        {_id: req.params.thoughtId}
      )
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that Id'});
      }
      await Thought.deleteMany({_id: {$in: thoughtData.thoughts}});
      res.json({ message: 'thought  deleted'})
    }catch (err) {
      res.status(500).json(err);
    }
  },
//post/create reaction to thought
async createReaction(req, res) {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      {_id: req.params,thoughtId},
      {$addToSet: {reactions: req.body}},
      {runValidators: true, new: true},
    );
    if (!thoughtData) {
      return res.status(404).json({ message: "No thought with that Id"});
    }
    res.json(thoughtData);
  }catch (err) {
    res.status(500).json(err);
  }
},
//delete reaction from thought
async deleteReaction(req, res) {
  try {
    const thoughtData = await Thought.findOneandDelete(
      {_id: req.params,thoughtId},
      {$pull: {reactions: {reactionId: req.params.reactionId}}},
      {runValidators: true, new: true},
    );
    if (!thoughtData) {
      return res.status(404).json({ message: 'No thought with that Id'});
    }
    res.json(thoughtData) 
    }catch (err) {
      res.status(500).json(err)
    }
  },
};
module.exports=thoughtControl
  