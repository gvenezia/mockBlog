# Mock Blog

Mock Blog is a responsive, functional framework for an image-led website or blog. 

Check it out [here](https://mock-blog.herokuapp.com/blogs)!

## User Stories
– Users are greeted by an attractive cascade of image cards with a title, short description, and the posted date
– Users can click on any of image cards to see that post's page
– Users can add, edit, and delete posts
– Users can utilize html markup to style the descriptions of their posts (the text is then sanitized to get rid of any scripts or links)

## How was it built?
MongoDB, Express.js, Node.js (MEN stack).

npm packages:"body-parser, ejs, express, express-sanitizer, masonry-layout, method-override, mongoose

The "views" are written in HTML inside of .ejs files for templating.

Styled with Semantic UI, masonry.js, and a bit of CSS. Semantic UI provides the responsive design. Masonry.js generates the cascading grid of images. 

Deployed with Heroku. The database is hosted on mLab.

![homepage-pic](https://github.com/gvenezia/mockBlog/blob/master/mockBlog.png)
