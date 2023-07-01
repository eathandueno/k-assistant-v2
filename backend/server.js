const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});
// Router Establishment
const userRouter = require('./routes/user');
const habitRouter = require('./routes/habit');
const deviceRouter = require('./routes/device');
const taskRouter = require('./routes/task');
const reminderRouter = require('./routes/reminder');
app.use('/user', userRouter);
app.use('/habit', habitRouter);
app.use('/device', deviceRouter);
app.use('/task', taskRouter);
app.use('/reminder', reminderRouter);
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});

