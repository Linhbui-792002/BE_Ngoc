import mongoose, { Schema } from 'mongoose';

const recordSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        li: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

const Record = mongoose.model('records', recordSchema);
export default Record;
