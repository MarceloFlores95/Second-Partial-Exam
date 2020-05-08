const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const {sport} = require('./models/sport-model')
const app = express();


/* Your code goes here */

app.delete('/sports/delete', jsonParser, (req, res) => {
    let id = req.body.id 
    let sportId = req.query.id

    console.log(id)
    console.log(sportId)
    if(!id) {
        res.statusMessage = "Please send the id in the body"
        return res.status(406).end()
    }

    if(!sportId) {
        res.statusMessage = "Please send the id in the queryString"
        return res.status(406).end()
    }

    if(id != sportId) {
        res.statusMessage = "Please send the the same id"
        return res.status(409).end()
    }

    sport.deleteSport(id)
        .then(response => {
            console.log(response)
            if(!response) {
                res.statusMessage = "The id dont exist"
                return res.status(404).end()
            } else {
                return res.status(204).end()
            }
            
        })
        .catch(err => {
            statusMessage = 'Internal Error'
            return res.status(500).end()
        })
    
    // delete endpoint
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});