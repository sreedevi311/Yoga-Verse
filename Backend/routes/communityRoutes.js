const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth.middleware');
const {
  getCommunityById,
  postToCommunity,deletePost,
  createCommunity,
  suggestCommunities,
  joinCommunity,
  leaveCommunity,
  getJoinedCommunities} = require('../controllers/communityControllers');

// Create community (admin use)
router.post('/', createCommunity);

router.post('/suggest',requireAuth,suggestCommunities);

router.post('/join/:id',requireAuth,joinCommunity)

router.post('/leave/:id', requireAuth, leaveCommunity)

// routes/communityRoutes.js
router.delete('/posts/delete/:postId', requireAuth, deletePost);

router.get('/joined/:userId',requireAuth,getJoinedCommunities);

// Fetch community with posts
router.get('/:id',requireAuth, getCommunityById);

// Add a post (requires login)
router.post('/:id/posts', requireAuth, postToCommunity);


module.exports = router;
