require('dotenv').config()
const express = require('express')
const cors = require('cors');
const db = require('./services/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.post('/add-url', async (req, res, next) => {
    try {
        let { urls } = req.body
        if(!urls) throw new Error('no data')
        urls = JSON.parse(urls)

        for (const item of urls) {
            await db.promise().execute('INSERT INTO urls ( url ) VALUES (?)', [item])
        }

        res.json({
            status: 'ok'
        })
    } catch (err) {
        next(err)
    }
})



app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
      status: 'error',
      message: err.message,
      stack: err.stack
    });
});


const PORT = process.env.PORT || 2000 
app.listen( PORT, () => console.log(`Server started on port ${PORT}`) )