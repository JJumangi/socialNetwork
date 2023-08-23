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
      
    }
  }
)