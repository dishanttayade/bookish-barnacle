const classModel = require('../../models/class.model')

exports.getAllClasses = async (req,res) => {
    try{
        const result = await classModel.find();
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