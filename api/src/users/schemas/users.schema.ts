import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    registrationDate: { type: Date, default: Date.now },
    age: String,
    occupation: String,
}, { minimize: false });

export const User = mongoose.model('User', userSchema);