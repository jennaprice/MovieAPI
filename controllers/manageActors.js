const _ = require('lodash');

async function getAllActors(req, res) {
  try {
    res.json({
      status: 200,
      message: 'Success',
      detail: ' retrieval sucessful',
      exportData
    });
  } catch (error) {}
}

module.exports = {
  getAllActors
};
