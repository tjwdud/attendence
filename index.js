const express = require('express')
const app = express()
const port = 8080
const { User } = require("./models/User");
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded이렇게 된 데이터를 분석해서 가지고 올수있게 해주는것
app.use(bodyParser.urlencoded({extended: true}));//bodyParser 옵션

//application/json으로 된것을 분석해서 가지고 올수있게 해주기 위해서
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sjy:abcd1234@attendence.p8lyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/register',(req,res) => {
    //회원가입 할때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다

    req.body안에 
    const user = new User(req.body) //인스턴스 만든다
    //몽고 디비에서 오는 메소드 정보들이 유저 모델에 저장이 된것 
    user.save((err, doc) =>{
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ //만약 성공했으면 success true
            success: true 
        })
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

