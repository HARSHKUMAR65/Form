const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://harsh:harsh@cluster0.fi8kqgv.mongodb.net/test');
    console.log('database is connected')
}

const userSchema = new mongoose.Schema({
    username: String,
    phone: Number,
    email: String,
    message: String
});

const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyparser.json());


//CURD OPERATIONS
server.post('/demo', async (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.message = req.body.message;
    const docs = await user.save();

    console.log(docs);
    res.json(docs);
})

server.get('/demo', async (req, res) => {
    const docs = await User.find({});
    res.json(docs)
})

server.listen(8080, () => {
    console.log('server started')
})