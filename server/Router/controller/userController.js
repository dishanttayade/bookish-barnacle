const userModel = require('../../models/user.model')

exports.getAllUsers = async (req,res) => {
    try{
        const result = await userModel.find();
        res.status(200).json({
            status: "success",
            data: result
        })
    }
    catch(err){
        return res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}