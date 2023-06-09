const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { Card, User } = require('./');
const { string } = require('joi');

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cards: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: Card,
      // type: [mongoose.Schema.Types.Object],
      // ref: Card,
      type: [Card],
    },
    owner: {
      // type: User.id,
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} boardName - The user's board's names
 * @param {mongoose.ObjectId} userId - The user's name
 * @returns {Promise<boolean>}
 */
boardSchema.statics.isNameTaken = async function (boardName, userId) {
  const board = await this.findOne({ boardName, owner: { $eq: userId } });
  return !!board;
};

/**
 * @typedef Board
 */
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
