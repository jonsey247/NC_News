### Tasks
 
 1. Seed your database with the main seed file `$ node seed/seed.js`
 2. Build your express App
 3. Mount an API Router onto your app
 4. Define the routes described below using TDD
 5. Define controller functions for each of your routes
 6. Once you have all your routes, tackle adding the vote and comment counts to every article when the articles are requested. Here is an example of what the response should look like: [http://northcoders-news-api.herokuapp.com/api/articles](http://northcoders-news-api.herokuapp.com/api/articles). You will need to use [Async.js](https://caolan.github.io/async/) or Promises. The [Bluebird](http://bluebirdjs.com/docs/api-reference.html) library provides extended functionality for Promises and may come in handy.
 
 ### Routes
 
 | Route |   |
 | ------|---|
 | `GET /api/topics` | Get all the topics |
 | `GET /api/topics/:topic_id/articles` | Return all the articles for a certain topic |
 | `GET /api/articles` | Returns all the articles |
 | `GET /api/articles/:article_id/comments` | Get all the comments for a individual article |
 | `POST /api/articles/:article_id/comments` | Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"} |
 | `PUT /api/articles/:article_id` | Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' e.g: /api/articles/:article_id?vote=up |
 | `PUT /api/comments/:comment_id` | Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' e.g: /api/comments/:comment_id?vote=down |
 | `DELETE /api/comments/:comment_id` | Deletes a comment |
 | `GET /api/users/:username` | Returns a JSON object with the profile data for the specified user. |