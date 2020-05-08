const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

const sportSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    num_players: {
        type: Number
    } // This is a String type holding a uuid
})

const sportCollection = mongoose.model('sports', sportSchema);

const sport = {
    deleteSport : function (id) {
        filter = {
            id:id
        }
        return sportCollection
            .deleteOne(filter)
            .then(result => {
                console.log(result)
                if(result.n > 0) {
                    return true
                } else {
                    return false
                }  
            })
            .catch(err => {
                return err
            })
    }
}


module.exports = {sport};