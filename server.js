const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //locally run karne ke liye 3000 aur heroku se bakchodi ke liye environment variable PORT

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs'); //tells express which view engine to use


app.use((req,res,next)=>{          //next is used ti tell when middlewear is over

var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url} `;

fs.appendFile('server.log',log + '\n',(err)={
  if(err){console.log('unable to append server.log');}
});
next();
})

// app.use((req,res,next)=>{
//
//   res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));//isko maintenance vaale part ke neeche he use karna chaheye

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear
});

app.get('/', (req,res)=>{
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    message: 'Welcome User',
  //  currentYear: new Date().getFullYear() we are using a helper instead of this
  });
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About page',
  //  currentYear : new Date().getFullYear()  we are using a helper instead of this
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error: 'unable to follow the request'
  })
})
app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
