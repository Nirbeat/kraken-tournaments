import jwt from 'jsonwebtoken';

export function createToken(challengerData){
    return jwt.sign(challengerData, process.env.JWT_KEY)
}

export function validateToken(token){
    return jwt.verify(token, process.env.JWT_KEY)
}