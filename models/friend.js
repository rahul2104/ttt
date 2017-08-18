var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      userSchema = new Schema( {
            to_id : String,
            from_id : String,
            action : String,
            createDate : Date,
            actionTime : Date
      },
      { collection: 'friend' }
              ),
userSchema.plugin(mongoosePaginate);
Friend = mongoose.model('friend',userSchema);

module.exports = Friend;
