const Child = require('../../models/childProfile');

const createChildProfile = async (req, res) => {
    let { name, sex, dob, father_name, mother_name, district_id, photo } = req.body;
    var responseType = {
        success: true,
        status: 200,
        message: "Operation performed successfully"
    };
    let newChild = new Child({
        name,
        sex,
        dob,
        father_name,
        mother_name,
        district_id,
        photo
    });

    let response = await newChild.save();
    res.send(responseType);
}

const getChildProfile = async (req, res) => {
    let allChild = await Child.find({});
    var responseType = {
        success: true,
        status: 200,
        message: "Child Profile Detail"
    };
    responseType.child_profile = allChild;
    res.send(responseType);
}


module.exports = {
    createChildProfile,
    getChildProfile
}