function createResponseSuccess(data) {
    return {
        status: 200,
        data: data
    }
}
function createResponseError(status, message) {
    return {
        status: status || 500,
        data: {
            error: message || 'unknown error'
        }
    }
}
function createResponseMessage(status, message) {
    return {
        status: status || 200,
        data: {
            message: message
        }
    }
}

module.exports = {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
}