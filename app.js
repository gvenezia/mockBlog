'use strict';

// Assign the required packages to variables
var bodyParser      = require("body-parser"),
    express         = require("express"),   
    expressSanitizer= require("express-sanitizer"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    app             = express()
;

// App config
// mongoose.connect("mongodb://localhost/mockBlog"); // old locally hosted database (contains numerous DB entries)
mongoose.connect("mongodb://user1:1234@ds115569.mlab.com:15569/mock-blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); 

// Mount the sanitizer middleware below the bodyParser() instantiations and above mounting of your routes (per the docs)
app.use(expressSanitizer());

// mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
});  

var Blog = mongoose.model("Blog", blogSchema);

// ============== ROUTES ==============
// Root Route
app.get("/", function(req, res){
   res.redirect("blogs");
});

// Index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if (err){
           console.log(err);
       } else {
           res.render("index", {blogs:blogs});
       }
    });
});

// New Route
app.get("/blogs/new", function(req, res){
   res.render("new");
});

// Create Route
app.post("/blogs", function(req, res){
    // Sanitize blog.body html
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
   // Create blog
   Blog.create(req.body.blog, function(err, newBlog){
      if (err){
          console.log(err);
      } else {
          res.redirect("/blogs");   
      } 
   });
});

// Show Route
app.get("/blogs/:id", function(req, res){
    // Find the blog, and display it, else console.log the error
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err){
           console.log(err);
       } else {
              res.render("show", {blog:foundBlog});           
       }
    });

});

// Update Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err){
           console.log(err);
       } else {
           res.render("edit", {blog:foundBlog});           
       }
    });
});

// Put Route
app.put("/blogs/:id", function(req, res){
    // Sanitize blog.body html
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if (err){
           console.log(err)
           res.redirect("/blogs/" + req.params.id + "/edit");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

// Destory Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});
    
    
// Check that the server is running successfully
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The mock-blog app is running");
});