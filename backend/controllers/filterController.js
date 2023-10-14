const dotenv = require("dotenv");
const Data = require("../models/data");

dotenv.config();

const filterData = async(req,res) => {
    const {dateRange, name, amountRange} = req.body;

    const query = {};

    if(!dateRange && !name && !amountRange){
        return res.json({
            "success": false,
            "error_code": 400,
            "message": "Select any option to filter data",
            "data": null
        });
    }

    if (dateRange) {
        query.date = { 
            $gte: dateRange.startDate || "2023-01-01", 
            $lte: dateRange.endDate || "2023-03-31"
        };
    }

    if (name) {
        query.name = { $regex: new RegExp(name, 'i') }; 
    }

    if (amountRange) {
        query.amount = { 
            $gte: amountRange.min || 0, 
            $lte: amountRange.max || 1000
        };
    }

    try {
        
        const filteredData = await Data.find(query);

        if(!filteredData){
            return res.json({
                "success": true,
                "error_code": 200,
                "message": "Data does not exist for your filter criteria",
                "data": []
            });
        }

        return res.json({
            "success": true,
            "error_code": 200,
            "message": "Successfully fetched Data for your filter criteria",
            "data": filteredData
        });

    } catch (err) {
        return res.json({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

module.exports = {
    filterData
}