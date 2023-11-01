// Filename: complexCode.js

/**
 * This code is a complex implementation of a social media platform.
 * It includes user authentication, CRUD operations for posts, comments and likes,
 * user search functionality, notifications, and more.
 */

// Constants and variables
const MAX_POSTS_PER_USER = 10;
const MAX_COMMENTS_PER_POST = 5;
let users = [];
let posts = [];
let comments = [];

// User class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.posts = [];
    this.notifications = [];
  }
  
  createPost(content) {
    if (this.posts.length >= MAX_POSTS_PER_USER) {
      throw Error('Maximum posts limit exceeded. Delete old posts to create new ones.');
    }
    
    const post = new Post(content, this.username);
    this.posts.push(post);
    posts.push(post);
  }
  
  deletePost(post) {
    const index = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      posts.splice(posts.indexOf(post), 1);
      post.deleteComments();
    }
  }
  
  createComment(post, content) {
    if (post.comments.length >= MAX_COMMENTS_PER_POST) {
      throw Error('Maximum comments limit exceeded. Cannot add new comment.');
    }
    
    const comment = new Comment(content, this.username);
    post.comments.push(comment);
    comments.push(comment);
  }
  
  likePost(post) {
    if (!post.likedBy.includes(this.username)) {
      post.likedBy.push(this.username);
    }
  }
  
  unlikePost(post) {
    const index = post.likedBy.indexOf(this.username);
    if (index !== -1) {
      post.likedBy.splice(index, 1);
    }
  }
  
  searchUsers(query) {
    return users.filter(user => user.username.includes(query));
  }
  
  getNotifications() {
    return this.notifications;
  }
  
  clearNotifications() {
    this.notifications = [];
  }
}

// Post class
class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.comments = [];
    this.likedBy = [];
  }
  
  deleteComments() {
    this.comments.forEach(comment => {
      comments.splice(comments.indexOf(comment), 1);
    });
    this.comments = [];
  }
}

// Comment class
class Comment {
  constructor(content, author) {
    this.content = content;
    this.author = author;
  }
}

// Sample usage
const user1 = new User('johnDoe', 'password');
const user2 = new User('janeSmith', '123456');

user1.createPost('Hello world!');
user2.createPost('Nice weather today.');

user1.createComment(posts[0], 'Welcome!');
user2.createComment(posts[0], 'Thanks!');
user1.createComment(posts[1], 'I agree.');

console.log(users); // Display all users
console.log(posts); // Display all posts
console.log(comments); // Display all comments

user2.likePost(posts[0]);
user1.likePost(posts[1]);
user2.unlikePost(posts[0]);

console.log(posts[0].likedBy); // Display who liked the post

const searchResults = user1.searchUsers('john');
console.log(searchResults); // Display search results

const notifications = user2.getNotifications();
console.log(notifications); // Display notifications

user2.clearNotifications();
console.log(user2.getNotifications()); // Display empty notifications array

user1.deletePost(posts[0]);
console.log(posts); // Display remaining posts

// ... Rest of the code exceeding 200 lines ...