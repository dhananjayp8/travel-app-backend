const Wishlist=require('../model/wishlist.model');

const createWishlistHandler=async(req,res)=>{
    const newWishlist=new Wishlist(req.body);
    try{
        const savedWishlist=await newWishlist.save();
        res.status(201).json(savedWishlist);
    }catch(error){
        res.status(500).json({message:"Failed to connect"});
    }

}

const deleteWishlistHandler=async(req,res)=>{
        try{
            await Wishlist.findByIdAndDelete(req.params.id);
            res.json({message:"Hotel deleted from Wishlist"});
        }catch(error){
            res.status(500).json({message:"could not delete from wishlist"});
        }
}

const getWishlistHandler=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find({});
        wishlist ? res.json(wishlist):res.json({message:"No items found in the wishlist"});
      }catch(error){
        console.log(error);
        res.status(500).json(error);
      }
}
module.exports={createWishlistHandler,deleteWishlistHandler,getWishlistHandler};

/**const newWishlist=new Wishlist(req.body);
    try{
        const savedWishlist=await newWishlist.save();
        res.status(201).json(savedWishlist);
    }catch(error){
        res.status(500).json({message:"Failed to connect"});
    }
 */
/**.delete(verifyUser,async(req,res)=>{
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({message:"Hotel deleted from Wishlist"});
    }catch(error){
        res.status(500).json({message:"could not delete from wishlist"});
    } */

    /** try{
          const wishlist=await Wishlist.find({});
          wishlist ? res.json(wishlist):res.json({message:"No items found in the wishlist"});
        }catch(error){
          console.log(error);
          res.status(500).json(error);
        } */