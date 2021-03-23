//Used to get all employee
const userData = (req, res, next) => {
    const data =  [{
        name: "Tiger Ni432424242xon",
        designation: "System Architect",
        country: "Edinburgh",
        age: 61,
        salary: "$320,800",
        id:1
    },
        {
            name: "Tiger Nixon1213242",
            designation: "System Architect",
            country: "Edinburgh",
            age: 61,
            salary: "$320,800",
            id:2
        },
        {
            name: "Tiger Nixon2",
            designation: "System Architect",
            country: "Edinburgh",
            age: 61,
            salary: "$320,800",
            id:3
        }
    ]
    res.status(200).json(data);
}

module.exports = userData;

