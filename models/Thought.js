const { Schema, model, Types } = require('mongoose');

//moment imported

const moment = require('moment');
const { kStringMaxLength } = require('buffer');

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
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
            
        },
        id: false,
    }
)
//Schema - Thought

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlenghth: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [SchemaReaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual("reactionCount")
.get(function() {
    return this.reactions.length;
});

//user model created using userschema

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;