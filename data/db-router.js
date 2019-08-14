const express = require('express');

const db = require('./db.js');

const router = express.Router();//api/posts


router.get('/',(req,res)=>{
    db.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err =>{
        res.status(500).json({
            err:err,
            message: "The information could not be retrieved"
        })
    })
    
});
router.get('/:id',(req,res)=>{

    const id = req.params.id;
    db.findById(id)
    .then(posts => {
        if(id){
            //return if id is found
            res.json(posts)
            //otherwise
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            err:err,
            message: "The comments information could not be retrieved"
        })
    })
    
});


router.post('/',(req,res) => {

    const newPost = req.body;
  

    db.insert(newPost)
    .then(post => {

         if(newPost.title && newPost.contents){
            res.status(201).json(post);
           } else {
                res.status(400).json({
                errorMessage: "Please provide title and content for the post"
           })
       }

    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the Post to the database'
        })
    })
});



router.post('/:id/comments',(req,res) => {
    console.log("post/id/comment", req.body);

    const newPost = req.body;
    const id = req.params.id;

    if(!id){
        res.status(404).json({
        message: "The post with the specified ID does not exist"
         })
   }


   if(!newPost.text) {
        res.status(400).json({
        errorMessage: "Please provide text for the comment"
        })
  }

  //comment to be added
    const newcomment ={
        text: newPost.text,
        post_id: id
    }

    


    db.insertComment(newcomment)
    .then(message => {
        res.status(201).json(message);
       })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the message to the database'
        })
    })
});


router.get('/:id/comments',(req,res)=>{

    const id = req.params.id;
    db.findPostComments(id)
    .then(posts => {
        if(id){
            res.json(posts)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            err:err,
            message: "The comments information could not be retrieved"
        })
    })
    
});

router.put('/:id',(req,res) => {

    const id = req.params.id;
    const newPost = req.body;

    if(!id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
  

    db.update(id, newPost)
    .then(post => {

         if(newPost.title && newPost.contents){
            res.status(201).json(post);
           } else {
                res.status(400).json({
                errorMessage: "Please provide title and content for the post"
           })
       }

    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the Post to the database'
        })
    })
});


router.delete('/:id',(req,res)=>{

    const id = req.params.id;

    db.remove(id)
    .then(posts => {
        if(id){
            //return if id is found
            res.json(posts)
            //otherwise
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            err:err,
            message: "The comments information could not be deleted"
        })
    })
    
});

//Hook up router to server
module.exports = router;