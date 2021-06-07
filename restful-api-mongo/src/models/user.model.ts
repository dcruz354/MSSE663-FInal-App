import {model, Schema} from 'mongoose';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import {databaseName, databaseSecret} from '../../environment';

interface User extends Document {
    id: number;
    username: string;
    password: string;
    tokens: [];
}

// user schema
export const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
     },
    ],
});

userSchema.pre<User>('save', async function (next) {
    const user = this;
    
      user.password = await bcrypt.hash(user.password, 8);
    
    next();
  });
  
userSchema.methods.generateAuthToken= async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, databaseSecret);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };
  
  userSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid login credentials' );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid login credentials' );
    }
    return user;
  };
  
 export  const User = model('User', userSchema);