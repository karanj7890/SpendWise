import jwt from "jsonwebtoken"

export const generateToken= (userId, res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,  //it is in milliseconds
        httpOnly: true,  //it prevents cross site scripting attacks
        sameSite: "None",
        secure:  process.env.NODE_ENV === "production",
    })

    return token
}
