const mongoose = require('mongoose');
const { Schema } = mongoose;

const Role = new Schema(
    {
      name: { type: String, required: true },
    },
    {
      versionKey: false,
    },
  );

module.exports = mongoose.model('Role', Role);