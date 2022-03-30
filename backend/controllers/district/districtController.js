const District = require('../../models/district');

const createDistrict = async (req, res) => {
    var responseType = {
        success: true,
        status: 200
    };

    let findDistrict = await District.find({ district_name: req.body.district_name });
    if (findDistrict.length > 0) {
        //if district already district
        responseType.success = false,
            responseType.message = "Got error while saving",
            responseType.Error = {
                district_name: "This District is already exist"
            }
    } else {
        //create new district
        let allDistrict = await District.find({});
        let numberOfDistrict = allDistrict.length + 1;
        let newDistrict = new District({
            id: numberOfDistrict,
            state_id: req.body.state_id,
            district_name: req.body.district_name
        })
        let response = await newDistrict.save();
        responseType.message = "Operation performed successfully";
    }
    res.send(responseType);
}

const getDistrict = async (req, res) => {
    var responseType = {
        success: true,
        status: 200,
        message: "District Detail"
    };
    var allDistrict = await District.find({ state_id: req.body.state_id }, { _id: 0, state_id: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    responseType.district = allDistrict;
    res.send(responseType);
}

module.exports = {
    createDistrict,
    getDistrict
}