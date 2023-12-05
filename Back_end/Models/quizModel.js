import mongoose, { Mongoose, Schema } from "mongoose";

const quizSchema = new Schema({
    questions : [
        {
            question : String,
            options : [ String ],
            correct_option : String,
            marks : Number
        }
    ]
   
});

export const Quizz = mongoose.model("Quiz",quizSchema);