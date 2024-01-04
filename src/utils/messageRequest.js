const messageRequest = (message, code, state, data) => {
    return { 
        message : message,
        code: code,
        state: state,
        data: data
    }
}

module.exports = { messageRequest } 