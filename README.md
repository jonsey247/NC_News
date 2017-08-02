## Northcoders News API

### Background

This is an API which I will be using for the
Front End of Northcoders News. 

### Requirments
If you do not have node, please install by following the link [https://nodejs.org/en/download/]

To check if you have node already installed, enter `$ node -v` into your terminal.

Then again in your terminal, install the dependencies with 
`$ npm install`

To seed the database use the terminal to cd into the repo then enter in the terminal `$ node seed/seed.js`

To start the server, in the terminal enter `$ npm start`

Once the database has been seeded and the server is running, you can run the tests. Open up another terminal and enter `$ npm test`

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
