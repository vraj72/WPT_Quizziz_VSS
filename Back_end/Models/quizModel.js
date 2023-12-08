import mongoose, { Mongoose, Schema } from "mongoose";

const quizSchema = new Schema({
    Quizz_ID : Number,
    time_in_minutes : Number,
    passing_percentage : Number,
    total_marks : Number,
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