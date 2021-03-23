//used to get particular employee
const getEmp = (req, res, next) => {
  const emp=  {
        name: "Tiger Nixon2",
            designation: "System Architect",
        country: "Edinburgh",
        age: 61,
    }
    res.status(200).json({employee:emp});
}

module.exports = getEmp;