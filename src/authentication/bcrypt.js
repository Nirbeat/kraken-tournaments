import {hashSync, compareSync, genSaltSync} from 'bcrypt';

export function hashPassword(password){

    return hashSync(password, genSaltSync())
}

export function validatePassword(password, hashedPassword){
    return compareSync(password, hashedPassword)
}