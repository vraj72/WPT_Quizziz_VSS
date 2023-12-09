import mongoose, { Mongoose, Schema } from "mongoose";

const quizAttemptSchema = new Schema({
    AID : Number,
    Quizz_ID : Number,
    Q_ID : String,
    Obtained_marks: Number,
    passing_percentage : Number,
    total_marks : Number,
    passing_status : String,
    questions :[
        {
            question : String,
            options : [ String ],
            correct_option : String,
            marked_option : String,
            marks : Number,
            marks_obtained : Number,
            status : Boolean
        }
    ]
});

export const QuizzAttempt = mongoose.model("QuizAttempt",quizAttemptSchema);