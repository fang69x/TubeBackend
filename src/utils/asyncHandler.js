// option 1 
 const asyncHandler1=(fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code||500).json({
            success:false,
            message:error.message
        })
    }
 }


 //option 2
 const asyncHandler2=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
 }
 export {asyncHandler2}