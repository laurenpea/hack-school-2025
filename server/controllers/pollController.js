// TODO
// ACTIVITY - Refactor all controller functions to handle requests!

const Poll = require("../models/Poll");

// add req, res to parameters
const getPolls = async (req, res) => {
  const poll = await Poll.find();
  console.log("Returning polls list...");
  res.status(200).json(poll); // refactor for 200 status code response
};

// replace id with req, res in parameters
const getPoll = async (req, res) => {
  // extract id from req.params
  const { id } = req.params;
  const poll = await Poll.findById(id);

  console.log(`Returning poll ${id}`);
  res.status(200).json(poll); // refactor for 200 status code response
};

// replace {} parameter with req, res
const postPoll = async (req, res) => {
  // extract poll information from req
  const { ownerId, title, description, options } = req.body;

  if (!ownerId || !title || !options) res.status(404); // replace with 404 Error

  const poll = new Poll({
    ownerId: ownerId,
    title: title,
    description: description,
    options: options,
  });

  await poll.save();
  res.status(200).json(poll); // replace with status code 200 response
};

// replace pollId and optionId with req, res
const postVote = async (req, res) => {
  // extract pollId and optionId from req
  const { pollId, optionId } = req.body;
  if (!pollId || !optionId) res.status(404); // update for 400 Error

  const updateOption = await Poll.updateOne(
    { _id: pollId, "options._id": optionId },
    {
      $inc: { "options.$.count": 1, totalVotes: 1 },
    }
  );

  if (updateOption.modifiedCount == 0) return "Error: failed to update poll"; // update for 400 Error

  const updatedPoll = await Poll.findById(pollId);

  console.log(`Vote cast for ${pollId} on option ${optionId}`);

  res.status(200).json(updatedPoll); // update for status code 200 res
};

module.exports = { getPolls, getPoll, postPoll, postVote };
