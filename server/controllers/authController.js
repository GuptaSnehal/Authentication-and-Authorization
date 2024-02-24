import userModel from "../models/user.js" ;
import fucntions from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
const {hashPassword , comparePassword} = fucntions;
const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req , res) =>{
     try {

        const {name , email , password} = req.body;
        //Check if name was entered
        if(!name){
            return  res.json({
                error: "name is required"
            })
        };

        //Check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: "password is required and should be atleast 6 characters long "
            })
        };

        //Check email
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                error: "email is already taken"
            })
        }

        const hashedPassword = await hashPassword(password);
          
        const user = await  userModel.create({
            name, email , password : hashedPassword
        });

        return res.json(user);

        
     } catch (error) {
        console.log(error);
     }
};


const loginUser = async (req , res) =>{
        try {
            const {email , password } = req.body ;
            let pass ;
            const user = await userModel.findOne({email});
            
            if(user){
                pass = user.password;

            }
            else{
                return res.json({
                    error: "You need to Register first!"
                })
            }

            const isvalid = await comparePassword(password , pass);
            if(!isvalid){
                return res.json({
                    error: "Incorrect password"
                })
            }
            else{
                jwt.sign({email : user.email , id: user._id , name: user.name }, process.env.JWT_SECRET, {},(err , token) => {
                    if(err) throw err ;
                    res.cookie('token' , token).json(user);
                })
            }

            // return res.json({status : 400});
    
            
        } catch (error) {
            console.log(error);
        }
}

const getProfile  = (req, res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token , process.env.JWT_SECRET , {} , (err, user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

export default {
    test,
    registerUser,
    loginUser,
    getProfile
};
