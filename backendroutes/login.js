
const login = (req, res, next) => {
    console.log('======dsdsd====',req.body);

    res.status(200).json({isLogin:true ,name:"pawan" , token:'47834gcsgfhs4773'});
}

module.exports = login;