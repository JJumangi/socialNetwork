const {Schema, model } = require ('mongoose');
const reactionSchema = require('./Reaction');

//schema for new Thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Place thought here",
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true
    },
    reactions: [reactionSchema]
  },
  {
    toJson: {
      getters: true
    },
    id: false
  }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});



const Thought = model('Thought', thoughtSchema);
module.exports = Thought;