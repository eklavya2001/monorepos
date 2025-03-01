import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
import { z } from "zod";
import {signupInput } from '@avyank_eklavya/common'//lekin error aa raha ha, ye error tab chala jayega jab tum common me tsconfig me jake declaration true karke (whick will generate an index.d.ts whcih will only contain a ts file, which will hava all info about ts types), npm publish kar doge naye version ke sath
import  {add}  from "ekchua_guide"
// const signupInput = z.object({
//   username : z.string(),
//   password: z.string(),
// })

// type SignupParams = z.infer<typeof signupInput>;// this has maybe no use here but now this can be used in frontend, the moto is to make code reusable to both frontend and backned
// therfore yaha se hata ke common me daal do isko , common is a package or module, a package can have multiple modules, modules are the block of code which are used by both frontend and backend
const router = express.Router();

  router.post('/signup', async (req, res) => {
console.log("bro wake up");
const sum: number = add(4, 5)
console.log(sum);


    // const parsedResponse = signupInput.safeParse(req.body)
    // if(!parsedResponse.success){
    //   return res.status(411).json({
    //     msg: "error while parsing"
    //   })
    // }  // now we do like this , niche dekho
    const parsedResponse = signupInput.safeParse(req.body)
    console.log(parsedResponse);
    
    if(!parsedResponse.success){
      console.log("chal raha ha bhaits");
      
      return res.status(403).json({
        msg : "invalid inputs"
      })
    }
    // const useranameType= parsedResponse.data?.username
    // const passwordType = parsedResponse.data?.password
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  export default router
