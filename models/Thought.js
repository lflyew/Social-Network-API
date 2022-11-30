const { Schema, model, Types } = require('mongoose');

//moment imported

const moment = require('moment')

//Schema- Reaction

const SchemaReaction = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        
    }
)
