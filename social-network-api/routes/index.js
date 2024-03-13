const express = require("express");
const multer = require("multer");
const {
  UserController,
  PostController,
  CommentController,
  LikeController,
} = require("../controllers");
const authenticateToken = require("../middleware/auth");
const FollowController = require("../controllers/follow-controller");

const router = express.Router();

const uploadDestination = "uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage });

//user
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put(
  "/users/:id",
  authenticateToken,
  uploads.single("avatar"),
  UserController.updateUser
);

//post
router.post("/posts", authenticateToken, PostController.createPost);
router.get("/posts", authenticateToken, PostController.getAllPosts);
router.get("/posts/:id", authenticateToken, PostController.getPostById);
router.delete("/posts/:id", authenticateToken, PostController.deletePost);
router.put("/posts/:id", authenticateToken, PostController.editPost);

//comment
router.post("/comments", authenticateToken, CommentController.createComment);
router.delete(
  "/comments/:id",
  authenticateToken,
  CommentController.deleteComment
);

//like
router.post("/likes", authenticateToken, LikeController.likePost);
router.delete("/likes/:id", authenticateToken, LikeController.unlikePost);

//subscription
router.post("/subscribe", authenticateToken, FollowController.subscribeUser);
router.delete(
  "/unsubscribe/:id",
  authenticateToken,
  FollowController.unsubscribeUser
);

module.exports = router;
