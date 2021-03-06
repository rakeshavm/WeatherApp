const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Raki'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Provide address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(longitude,latitude, (error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({ 
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search item'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        name: 'Raki',
        helpText: 'this is help!'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        name:'Raki'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name: 'Raki',
        errorMes:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Raki',
        errorMes:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})