import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema ({
    connection_string: {
        type:String,
        min:5,
        max:15,
        unique:true
    },
    ping: {
        type:Date,
        default:Date.now
    },
    status: {
        type: String,
    },
    from: {
        type:String,
        default:null
    },
    to: {
        type:String,
        default:null
    }
})

export default mongoose.model('Board',boardSchema);