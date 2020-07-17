const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article')
const methodOverride = require('method-override');
const app = express();

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(err)=>{
    if(!err) console.log(`Connection Setup Succesfully`);
    else
    console.log(err)
})

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use('/articles',articleRouter)

app.get('/',(req,res)=>{
     Article.find()
            .then((articles,err)=>{
                if(err) console.log(`Error occur`+err);
                else
                res.render('articles/index',{articles:articles})
            })

})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));