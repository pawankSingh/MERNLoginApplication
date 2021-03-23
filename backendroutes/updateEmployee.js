const updateEmp = (req, res, next) => {
    console.log('======dsdsd====',req.body)
    res.status(200).json({status:true});
}

module.exports = updateEmp;