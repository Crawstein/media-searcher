import {userService} from "./authorization.services";

export function signup(data) {
    return dispatch => {
        userService.signup(data)
            .then(
                user => {
                    dispatch(request(user))
                }
            );

    };

    function request(user) {
        return {type: "USER_SIGNUP", user}
    }
}

export function signin(data) {
    return dispatch => {
        userService.signin(data)
            .then(
                user => {
                    dispatch(request(user))
                }
            );

    };

    function request(user) {
        return {type: "USER_SIGNIN", user}
    }
}