import React, { useState } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
function LoginPage(props) {
    const dispatch = useDispatch();
    //컴포넌트 안에서 값이 변할때는 state를 이용한다 props state 
    //서버에 보내야 할 정보를 state에 가지고 있는것 
    const [Email, setEmail] = useState("")//onChange이벤트 발생해서 State이 바뀐다.
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault();//이게 없으면 버튼을 눌렀을경우 페이지가 리로드되면서 할 수 없게됨 
        let body = {
            email: Email,
            password: Password
        }//dispatch를 이용해서 action을 취해야 한다 (action->reducer->store)
        dispatch(loginUser(body))//액션 이름 loginUser안에 바디를 전해준다 _actions 폴더에 user_action.js로 보낸다. 
            .then(response => {
                if (response.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert('Error')
            }
            })
    }
    return (
        <div style={{ display:'flex', justifyContent:'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            <form style ={{ display:'flex', flexDirection:' column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>

        </div>
    )
}

export default LoginPage
