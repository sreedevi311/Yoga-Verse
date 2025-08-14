const mongoose = require('mongoose')
const Community = require('../models/community.model');
const User=require('../models/user.model');

// GET /communities/:id
const getCommunityById = async (req, res) => {
  try {

    const community = await Community.findOne({ _id: req.params.id }).populate('theme'); // use findOne instead of findById if _id is a string (UUID)

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error('Error fetching community by ID:', error); // ✅ log error reason
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /communities/:id/posts
const postToCommunity = async (req, res) => {
  const { text, imageUrl } = req.body;

  // 🛡️ Check for valid input
  if (!text && !imageUrl) {
    return res.status(400).json({ error: 'Post must include text or an image.' });
  }

  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ error: 'Community not found' });

    // 📝 Push new post into community's posts array
    community.posts.push({ text, imageUrl, userId: req.user.userId,createdAt: new Date() });
    await community.save();

    // ✅ Return the new post
    const newPost = community.posts[community.posts.length - 1];
    res.status(201).json({ message: 'Post added', post: newPost });

  } catch (err) {
    console.error('❌ Failed to post:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  const userRole = req.user.role;

  console.log('🗑️ Incoming delete request for post:', postId);

  try {
    const objectId = new mongoose.Types.ObjectId(postId);

    const community = await Community.findOne({ 'posts._id': objectId });

    if (!community) {
      console.log('❌ Community with post not found');
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('✅ Community found:', community._id);

    const post = community.posts.find(p => p._id.toString() === postId);

    if (!post) {
      console.log('❌ Post not found in community');
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log(`🧾 Post found. Author: ${post.userId}`);
    console.log(`🔐 Requesting user: ${userId} | Role: ${userRole}`);

    if (post.userId?.toString() !== userId && userRole !== 'admin') {
      console.log('❌ Not authorized to delete this post');
      return res.status(403).json({ message: 'Not authorized' });
    }

    // ✅ Safe delete
    community.posts = community.posts.filter(p => p._id.toString() !== postId);
    await community.save();

    console.log('🗑️ Post deleted successfully');
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('🔥 Error deleting post:', err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};



// POST /communities/suggest
const suggestCommunities = async (req, res) => {
  try {
    const { userCity, nearbyCities } = req.body;
    if (req.user.role === 'admin') {
      const allCommunities = await Community.find().populate('theme');
      return res.json(allCommunities); // ✅ Return everything for admin
    }

    console.log('suggest request:', { userCity, nearbyCities });


    const citiesToMatch = [userCity, ...(Array.isArray(nearbyCities) ? nearbyCities : [])];

    const communities = await Community.find({
      cities: { $in: citiesToMatch }
    });
console.log(communities)
    res.json(communities);
  } catch (err) {
    console.error('❌ Failed to fetch suggestions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// POST /communities/join/:id
const joinCommunity = async (req, res) => {
  const userId = req.user.userId
  const communityId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(communityId)) {
    return res.status(400).json({ error: 'Invalid community ID' })
  }

  try {
    const user = await User.findById(userId)
    const community = await Community.findById(communityId)

    if (!community) {
      return res.status(404).json({ error: 'Community not found' })
    }

    if (!user.communities.includes(communityId)) {
      user.communities.push(communityId)
      await user.save()
    }

    res.status(200).json({ message: 'Community joined successfully' })
  } catch (err) {
    console.error('Error joining community:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const leaveCommunity = async (req, res) => {
  const userId = req.user.userId
  const communityId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(communityId)) {
    return res.status(400).json({ error: 'Invalid community ID' })
  }

  try {
    const user = await User.findById(userId)

    if (!user) return res.status(404).json({ error: 'User not found' })

    user.communities = user.communities.filter(
      (cid) => cid.toString() !== communityId
    )

    await user.save()
    res.status(200).json({ message: 'Community left successfully' })
  } catch (err) {
    console.error('Error leaving community:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// POST /communities (for admin only)
const createCommunity = async (req, res) => {
  const { theme, cities } = req.body;
  try {
    const community = new Community({ theme, cities });
    await community.save();
    res.status(201).json({ message: 'Community created', community });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create community' });
  }
};

// GET /nearby-happenings/communities/joined/:userId
const getJoinedCommunities = async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(404).json({ message: 'User not found' })
    console.log(user.communities)
  res.json({ joinedCommunities: user.communities })
}


module.exports = {
  getCommunityById,
  postToCommunity,
  deletePost,
  suggestCommunities,
  joinCommunity,
  leaveCommunity,
  createCommunity,
  getJoinedCommunities,
};
