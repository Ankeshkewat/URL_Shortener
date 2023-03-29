const express = require('express');
const cors = require('cors')
require('dotenv').config()
const randomString = require('random-string-generator')


const app = express();
const { Connection } = require('./config/db')
const { URLModel } = require('./model/Model')


app.use(express.json())
app.use(cors())


//post
app.post('/post', async (req, res) => {
    const { long_url, name } = req.body
    try {
        let sort_url_new;
        if (name) {
            sort_url_new = name;
        } else {
            sort_url_new = randomString(10, 'lower')
        }
        const data = await URLModel.find({ long_url })
        if (data.length > 0) {
            await URLModel.findOneAndUpdate({ long_url }, { $set: { sort_url: sort_url_new } })
        }
        else {
            const payload = new URLModel({ long_url, sort_url: sort_url_new });
            await payload.save()
        }
        const ans = await URLModel.findOne({ long_url });
        res.status(201).send({ 'msg': "Successfull", "url": `https://urlshortener-7aek.onrender.com/${ans.sort_url}` })
    }
    catch (err) {
        console.log(er);
        res.status(500).send({ "msg": "Something went wrong" })
    }
})

// ********
app.get('/:url', async (req, res) => {
    try {
        const sort_url = req.params.url
        const data = await URLModel.findOne({ sort_url });
        res.redirect(data.long_url)
        res.end()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ "msg": "Something went wrong" })
    }
})


app.listen(2600, async () => {
    try {
        await Connection
        console.log('Connected to the database')
    }
    catch (err) {
        console.log(err)
    }
})

