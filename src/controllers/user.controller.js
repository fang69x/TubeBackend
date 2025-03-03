import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
// get user details from frontend
 const {username,email,password,fullname}= req.body;
 console.log("email",email);
 
//validation->not empty?


// one option is to check each field
// if(fullname==="")
// {
//     throw new ApiError(400,"Full name is required") 
// }

// a better option is to use power of js
if([fullname,username,email,password].some((field)=>
    field?.trim()===""))
{
    throw new ApiError(400,"All fields are required")
}

// check if user already exists : username, email

const existedUser=User.findOne({
    $or:[{username},{email}]
})
if(existedUser)
{
    throw new ApiError(409,"User with email or username already exist")
}

// check for images, check for avatar
 const avatarLocalPath= req.files?.avatar[0]?.path;
 const coverImageLocalPath=req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
 }


// upload them to cloudinary,avatar
const  avatar=await uploadOnCloudinary(avatarLocalPath)
const  coverImage=await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}

// create user object -> create entry in db
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken -"
)
if(!createdUser)
{
    throw new ApiError(500,"Something went wrong while registering user")
}

// remove password and refresh token field from response
return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

// check for user creation ? return response: return error

// 
});

export { registerUser };
