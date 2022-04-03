const classworkModel = require('../../models/classwork.model')

exports.getAllClassworks = async (req,res) => {
    try{
        const result = await classworkModel.find();
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