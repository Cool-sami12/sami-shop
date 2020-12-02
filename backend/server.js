const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');


require('dotenv').config();

const app = express();
// app use

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const uri = process.env.ATLAS_URI;
 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/users', userRouter);

const port = process.env.PORT || 3000;


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`)
});