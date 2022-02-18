import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string,
    password: string,
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const userRepository = getCustomRepository(UsersRepositories)

        const user = await userRepository.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch= await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "03ec827bd18c1c99e15331b863fdd7ac", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService}