const express = require('express');
const router = express.Router();

// ACTIVITY: Create routes that call controller functions when rrequested
router.get('/polls', pollController.getPolls);
router.get('/polls/id/:id', pollController.getPoll);

router.post('/polls', postController.postPolls);
router.post('/vote', postController.postVote);

module.exports = router;
