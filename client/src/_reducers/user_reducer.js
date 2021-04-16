import { LOGIN_USER, 
        REGISTER_USER } from "../_actions/types";

export default function foo(state = {}, action){
    switch(action.type) {//다른 타입이 올때마다 다른 조치를 취해야하기 때문에 types
        case LOGIN_USER:
            return { ...state,loginSuccess: action.payload }//현재타입과 액션을 보낸다
        case REGISTER_USER:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}