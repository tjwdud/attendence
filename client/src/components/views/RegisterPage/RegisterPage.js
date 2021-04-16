import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
   

    //컴포넌트 안에서 동적으로 바뀌는 값->state라고 한다
    //useState함수 사용으로 state를 사용할수 있다.
    //리액트Hook
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ComfirmPassword, setComfirmPassword] = useState("")
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onComfirmHandler = (event) => {
        setComfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ComfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.') //비밀번호가 다르면 뒤에 진입을 못한다

        }
        let body = {
            email: Email,
            name: Name,
            password: Password
        }
        dispatch(registerUser(body))
            .then(response => {
                alert('가입이 완료됨')
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert('가입안됨')
                }
            })

    }
    return (

        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: ' column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>비밀번호확인</label>
                <input type="password" value={ComfirmPassword} onChange={onComfirmHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>

        </div>
    )
}

export default RegisterPage
