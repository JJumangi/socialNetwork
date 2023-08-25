const {Schema, model } = require ('mongoose');


//schema for new Thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: "Place thought here",
      minLength: 1,
      minLength: 280
    },
    createdAt: {
      type: Data,
      default: Date.now,
    },
    username: {
      type: String,
      require: true
    },
    reactions : [reactionSchema]
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