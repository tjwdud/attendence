const{ User } = require('../models/User');


let auth = (req, res, next) => {
    //인증처리들을 여기서 처리한다

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })
        //요청을 받을때 토큰과 유저를 넣어줌으로 인해서 사용할수 있게 하려고 유저와 토큰 정보를 같이 보내는 것이다 
        req.token = token;
        req.user = user;
        next()
    })
    //유저가 있으면 인증 okey,
    //유저가 없으면 인증 X

}
module.exports = { auth };