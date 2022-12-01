const { Schema, model, Types } = require('mongoose');

//schema to create user model

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address", ],
            
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",

            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },

        id: false,
    }
);

userSchema.virtual("friendCount").get(function () { 
    return this.friends.length;
});

const User = model ('User', userSchema);

//export user model

module.exports = User;
