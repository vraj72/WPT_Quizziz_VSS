import mongoose, { Mongoose, Schema } from "mongoose";

const quizAttemptSchema = new Schema({
    questions :[
        {
            question : String,
            options : [ String ],
            correct_option : String,
            opted_option : String,
            marks : Number,
            marks_obtained : Number
        }
    ]
});

export const QuizzAttempt = mongoose.model("QuizAttempt",quizAttemptSchema);