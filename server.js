// Dependencies
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/authRoute');
const mongoose = require('mongoose')


// App Initialization and Config
const app = express();
dotenv.config();


// Express Settings
app.set('view engine', 'pug');
app.set('views', 'views')



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


// Routes
app.use(authRouter)



// Not Found Handler
app.use(notFoundHandler);




// Error Handler
app.use(errorHandler);



// Server Listen
mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        try {
            app.listen(process.env.PORT || 3000, () => {
                console.log("Server has been runing on port" + ' ' + 3000);
            })
        } catch (error) {
            console.log(error);
        }
    })
