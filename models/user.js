
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose')
      ,Schema = mongoose.Schema
      userSchema = new Schema( {
                       
     user_device_type: String,
    phone_no : String,
    user_device_token : String,
    userId : String,
    createDate : Date,
    mDate : Date,
    status : String,
    notification : String,
    mapvisibility : String,
    friend_badge : Number,
    ride_badge : Number,
    phone_last_10digit : String,
    otp : String,
    updateTime : Date,
    user_name : String,
    search_Name : String,
    user_email : String,
    user_gender : String,
    user_dob :String,
    music : String,
    pets : String,
    smoking : String,
    profile_pic : String,
    home :String,
    home_lat : String,
    home_long :String,
    home_gps : {
    type: Object,
    properties: {
      type: {
        type: String,
        enum: 'Point',
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }},
    lastLoginDate : Date,
    lat : String,
    long : String,
    gps: {
    type: Object,
    properties: {
      type: {
        type: String,
        enum: 'Point',
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }},
    userInterest : [ 
        {
            classification_id : String,
            classification : String,
            category : String,
            isInterest : String
        }
       
    ],
    eventInterest : [String],
    work : String,
    work_lat : String,
    work_long : String,
    work_gps : {
    type: Object,
    properties: {
      type: {
        type: String,
        enum: 'Point',
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }},
    visibilityEnable : String,
    visibilityEnableTime : String,
    fb_id : String,
    fb_access_token : String,
    socketId:String
      },
      { collection: 'user' }
      ),
              
        
userSchema.plugin(mongoosePaginate);
User = mongoose.model('user',userSchema);

module.exports = User;
