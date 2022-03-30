const State = require('../../models/state');


const createState = async (req, res) => {
    var responseType = {
        success: true,
        status: 200
    };

    let findState = await State.find({ state_name: req.body.state_name });
    // console.log(findState);
    if (findState.length > 0) {
        //if state already exist
        responseType.success = false,
            responseType.message = "Got error while saving",
            responseType.Error = {
                state_name: "This State is already exist"
            }
    } else {
        //create new state
        let allStates = await State.find({});
        let numberOfStates = allStates.length + 1;
        let newState = new State({
            id: numberOfStates,
            state_name: req.body.state_name
        })
        let response = await newState.save();
        responseType.message = "Operation performed successfully";
    }
    res.send(responseType);
}


const getState = async (req, res) => {
    var responseType = {
        success: true,
        status: 200,
        message: "State Detail"
    };
    var allStates = await State.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    responseType.state = allStates;
    res.send(responseType);
}


module.exports = {
    createState,
    getState
}