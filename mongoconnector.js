const moongose = require('mongoose');
require('dotenv').config()

moongose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => { console.log('mongodb successfully connected') })
    .catch(err => console.log(err));