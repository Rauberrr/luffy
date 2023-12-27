"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
const express_1 = require("express");
const PostController_1 = __importDefault(require("./Controllers/PostController"));
const CommentController_1 = __importDefault(require("./Controllers/CommentController"));
const UserController_1 = __importDefault(require("./Controllers/UserController"));
const LikeController_1 = __importDefault(require("./Controllers/LikeController"));
const routes = (0, express_1.Router)();
// UserController
routes.post('/create-user', UserController_1.default.create);
routes.post('/login-user', UserController_1.default.login);
routes.put('/userId/img', UserController_1.default.uploadImg);
// PostController
routes.get('/posts', PostController_1.default.list);
routes.get('/posts/:postId', PostController_1.default.listId);
routes.get('/posts/userId/:userId', PostController_1.default.listUserId);
routes.get('/posts/userId/likes/:userId', PostController_1.default.listUserIdLikes);
routes.post('/post', PostController_1.default.create);
routes.put('/post/:postId', PostController_1.default.update);
routes.delete('/post/:postId', PostController_1.default.delete);
// CommentController
routes.get('/comments/:postId', CommentController_1.default.list);
routes.post('/comments/:postId', CommentController_1.default.insert);
routes.put('/comments/:postId/:commentId', CommentController_1.default.update);
routes.delete('/comments/:postId/:commentId', CommentController_1.default.delete);
// LikeController
routes.get('/likes/postId/:postId', LikeController_1.default.listPostId);
routes.get('/likes/userId/:userId', LikeController_1.default.listUserId);
routes.get('/likes/comments/:commentId', LikeController_1.default.listComments);
routes.post('/likes/:postId/:commentId', LikeController_1.default.insertComments);
routes.post('/likes/:postId', LikeController_1.default.insert);
routes.delete('/likes/:postId', LikeController_1.default.delete);
exports.default = routes;
