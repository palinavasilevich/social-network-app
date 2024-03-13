const { prisma } = require("../prisma/prisma-client");

const FollowController = {
  subscribeUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(500).json({ error: "You can't follow yourself" });
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId }],
        },
      });

      if (existingSubscription) {
        return res
          .status(400)
          .json({ error: "You are already following this user" });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: "Subscription created successfully" });
    } catch (error) {
      console.error("Subscribe error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  unsubscribeUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    try {
      const follows = await prisma.follows.findFirst({
        where: { AND: [{ followerId: userId }, { followingId }] },
      });

      if (!follows) {
        return res
          .status(404)
          .json({ error: "You are not following this user" });
      }

      await prisma.follows.delete({ where: { id: follows.id } });

      res.status(201).json({ message: "Subscription successfully deleted" });
    } catch (error) {
      console.error("Unsubscribe error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = FollowController;
