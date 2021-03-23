const register = (req, res, next) => {
    console.log('======dsdsd====',req.body)
    res.status(200).json({registered:true});
}

module.exports = register;