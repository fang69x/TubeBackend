import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

/**
 * Controller function to register a new user
 * Handles user data validation, duplicate checking, file uploads, and user creation
 */
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const { username, email, password, fullname } = req.body;
    console.log("email", email);
    
    // validation - check if any required fields are empty
    // NOTE: The method below uses JavaScript's some() array method to check
    // if any of the fields are empty after trimming whitespace
    
    // one option is to check each field individually (less efficient)
    // if(fullname==="")
    // {
    //     throw new ApiError(400,"Full name is required") 
    // }

    // a better option is to use power of js - check all fields at once
    if ([fullname, username, email, password].some((field) =>
        field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username, email
    // NOTE: Using $or MongoDB operator to check for either username OR email match
    // FIX: Missing await before User.findOne
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser)
    {
        throw new ApiError(409, "User with email or username already exists")
    }

    // check for images, check for avatar
    // NOTE: req.files comes from multer middleware that processes uploaded files
    // FIX: Added optional chaining to prevent errors if structure is different
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // upload them to cloudinary, avatar
    // NOTE: uploadOnCloudinary handles the actual file upload to Cloudinary service
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    
    // Only try to upload coverImage if it exists
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Error uploading avatar file")
    }

    // create user object -> create entry in db
    // NOTE: User.create is a Mongoose method that creates a new document in MongoDB
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // Use empty string if no cover image
        email,
        password, // NOTE: Password should be hashed in the model's pre-save hook
        username: username.toLowerCase() // Store username in lowercase for consistency
    })
    
    // remove password and refresh token field from response
    // NOTE: select("-field") excludes fields from the returned document
    // FIX: Removed extra dash at the end
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    // Return success response with created user data
    // NOTE: ApiResponse is a custom class for formatting API responses
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

// check for user creation ? return response: return error

 

export { registerUser };
