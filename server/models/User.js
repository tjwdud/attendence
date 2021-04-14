const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {//유효성 관리
        type: String
    },
    tokenExp: {//토큰의 유효기간
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    
    if(user.isModified('password')){//user 정보중 password바뀔때만 실행
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
    
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
    
            })
            //비밀번호를 암호화 시킨다
        })
    } else {
        next()
    }
    
}) //유저 모델에 정보를 저장하기 전에 

userSchema.methods.comparePassword = function(plainPassword, cb){
    //원래 비밀번호와 암호화된 비밀번호가 같은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null,isMatch);

    })
}
userSchema.methods.generateToken = function(cb) {
    
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function ( token, cb){
    var user = this;

    //user._id + '' = token

    jwt.verify(token,'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){

            if (err) return cb(err);
            cb(null, user) //에러가 없으면 유저정보를 전달

        })
    })
    //토큰을 decode 한다
    
}
const User = mongoose.model('User', userSchema)

module.exports = { User }