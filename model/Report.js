import mongoose, { model } from "mongoose";

const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true,
        enum: ['sexualContent', 'falseInformation', 'abusiveLanguage', 'fakeAccounts'],
    },
    reportContent:{
        type:String,
    }
})

const Report = model("Report", reportSchema)

export default Report