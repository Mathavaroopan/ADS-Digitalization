const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        path: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('File', fileSchema)