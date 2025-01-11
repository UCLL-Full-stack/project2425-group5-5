import jwt from 'jsonwebtoken';
import { UserType } from '../types';

const generateJwtToken = ({ username, usertype }: { username: string; usertype: UserType }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

    try {
        return jwt.sign({ username, usertype }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
