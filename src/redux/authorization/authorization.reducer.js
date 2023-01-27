const authorizationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP':
            return {
                loggingIn: true,
                user: action.user
            };
            break
        case 'USER_SIGNIN':
            return {
                loggingIn: true,
                user: action.user
            };
            break
        default:
            return state
            break
    }
}

export default authorizationReducer