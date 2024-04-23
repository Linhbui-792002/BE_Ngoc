import mongoose, { Schema, ObjectId } from 'mongoose';

const pileSchema = new Schema(
    {
        _id: {
            type: ObjectId,
        },
        a: {
            type: Number,
            required: true,
        },
        hm: {
            type: Number,
            required: true,
        },
        B: {
            type: String,
            required: true,
        },
        CB: {
            type: String,
            required: true,
        },
        n: {
            type: Number,
            required: true,
        },
        r: {
            type: Number,
            required: true,
        },
        cdc: {
            type: Number,
            required: true,
        },
        cdtt: {
            type: Number,
            required: true,
        },
        Pvl: {
            type: Number,
            required: true,
        },
        record: {
            type: ObjectId,
            ref: 'records'
        }
    },
    {
        timestamps: true,
    }
);

const Pile = mongoose.model('piles', pileSchema);
export default Pile;
