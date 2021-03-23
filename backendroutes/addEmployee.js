//used to add employee

const addEmployee = (req, res, next) => {
    console.log('======dsdsd====',req.body)
    res.status(200).json({status:true});
}

module.exports = addEmployee;