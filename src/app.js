const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views','templates/views');

const partialPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialPath);

// set up static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Hrdya'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About the app author',
        name : 'Hrdya'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message : 'Pls provide Location and this app provides the weather details',
        title: 'Help Text',
        name: 'Hrdya'
    });
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({ error : "Please provide the address!"});
    }
    geocode(req.query.address,(error,{longitude,latitude,location} = {})=>{
        if(error){
           return res.send({error});
        }
        console.log(longitude);
        console.log(latitude);
        forecast(latitude,longitude,(error,{forecast})=>{
            if (error){
                res.send(error);
            }else{
                res.send({forecast,location});
            }
        })
    })
    // console.log(req.query.address);
    // res.send({
    //     forecast : '50 degrees',
    //     location : 'Indianapolis',
    //     address : req.query.address
    // });
});
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : 'Weather App',
        errorMsg:'Help Page Not Found',
        name: 'Hrdya'
    });
})
app.get('*',(req,res)=>{
    res.render('error',{
        title : 'Weather App',
        errorMsg:'404 Error - Page Not Found',
        name: 'Hrdya'
    });
})

app.listen(3000,() =>{
    console.log('listening to port 3000');
});