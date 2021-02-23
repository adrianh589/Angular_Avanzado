const respuestaJSON = (res, ok, msg, stat= 200, ...args) => {
    return res.status(stat).json ({
        ok,
        msg
    });
}

module.exports = {
    respuestaJSON
}
