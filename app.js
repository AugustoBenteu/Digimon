const { render } = require('ejs');
const express = require('express')
const axios = require('axios').default;
const app = express()
const path = require('path')
const port = 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const baseURL = 'https://digimon-api.vercel.app/api/digimon'


app.get('/', async	(req, res) => {
	const list = await axios.get(baseURL)
	const digimons = list.data
	res.render('home', {digimons})
})

app.get('/level/:level', async	(req, res) => {
	const {level} = req.params
	const list = await axios.get(`https://digimon-api.vercel.app/api/digimon/level/${level}`)
	const digimons = list.data
	res.render('level', {digimons,level})
})

app.get('/name', async	(req, res, next) => {
	try{
		const {name} = req.query
		const list = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
		const digimons = list.data
		res.render('name', {digimons,name})
	}catch(e){next(e)}
})

app.use((err,req,res,next) =>{
    
    res.render('error')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
