import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minlength: 3,
            maxlength: [10, "El nombre es muy largo"]
        },
        age: {
            type: Number,
            min: 18,
            max: 50
        },
        email: {
            type: String,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            lowercase: true,
            trim: true,
            validate: [
                {
                    validator: (value) => {
                        if (value.length < 10) return false
                        return true
                    },
                    message: "El email es muy corto!!"
                }
            ]


        }
    },
    { timestamps: true }
)

export const UserModel = mongoose.model("Users", Schema)