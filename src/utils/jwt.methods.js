import 'dotenv/config';
import jwt from 'jsonwebtoken';
// TODO: Use the callback for generate a two separates TOKENS, ACCESS_TOKEN & REFRESH_TOKEN
// TODO: Adapt the provided projecto to replicate the funtioanality
// TODO: Prevent the Brute Force Attack
export const SECRET_KEY = process.env.JWT_64 || 'secret';
/**
 * JWT methods
 */
// Only wuth the TYPE "jwt.SignOptions" can be assing to the JWT sign method
/*const JWTOptions:jwt.SignOptions = {
    expiresIn: '10s',
    algorithm: 'HS256'
}*/
export default {
    sign: (payload, JWTOptions) => jwt.sign(payload, SECRET_KEY, JWTOptions),
    verify: (token) => jwt.verify(token, SECRET_KEY)
};
