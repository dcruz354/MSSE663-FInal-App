import { User } from './../models/user.model';
import * as bcrypt from 'bcryptjs';

export const getUserById = (id: string, callback: any) => {
    User.findById(id, callback);
};

export const getUserByUsername = (username: string, callback: any) => {
    const query = {username};
    User.findOne(query, callback);
};

export const addUser = (user: any, callback: any) => {
    bcrypt.hash(user.password, 10, (err: any, hash: any ) => {
        if(err) { throw err;}
        user.password = hash;
        user.save(callback);
    });
};

export const updateUser = (req: any, res: any, next: any ) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error: any, data: any ) => {
        if(error) {
            console.log(error + 'for data' + data);
            return next(error);
        } else {
            res.status(200).json({success: true, msg: 'User has been updated!'});
        }
    });
};

export const compareCredential = (candidatePassword: any, hash: any, callback: any) => {
    bcrypt.compare(candidatePassword, hash, (err: any, isMatch: any) => {
        if(err) { throw err;}
        callback(null, isMatch);
    });
};