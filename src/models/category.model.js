import moongose from 'moongose';
import { collections } from '../common/db.js';

const categorySchema = new moongose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 100,
        },
    },
    {
        timestamps: true,
    },
);


export const Category = moongose.model(collections.category, categorySchema);