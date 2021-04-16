import axios from 'axios';
//이메일과 패스워드 넣어준것을 여기 파라미터를 통해서 받는다.
import {
    LOGIN_USER,
    REGISTER_USER
} from './types'
export function loginUser(dataToSubmit) { //loginpage에서 받은 것을 처리하는 함수 

    const request = axios.post('/api/users/login', dataToSubmit)//서버에 request를 보낸다
        .then(response => response.data) //서버에서 받은 data를 request에 저장을 한다.

    return {
        type: LOGIN_USER,
        payload: request//response를 페이로드라고 부를것이다.
    }//리듀서로 보낸다 user_reducer
}
export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register',dataToSubmit)
        .then(response => response.data)
        return {
            type: REGISTER_USER,
            payload: request

        }
}