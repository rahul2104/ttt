
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      gameSchema = new Schema( {             
       socket_id:[] ,
       user_id:[],
       insert_date:Date,
       x_score:Number,
       o_score:Number,
       draw:Number,
      },
      { collection: 'game' }
      ),
              
        
gameSchema.plugin(mongoosePaginate);
Game = mongoose.model('game',gameSchema);

module.exports = Game;
