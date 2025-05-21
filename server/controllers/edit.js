import PostModel from "../models/Post.js";
import path from "path";

export const putEdit = async (req, res) => {
    const { title, body, id } = req.body
    const { filename } = req.file;
    
    try {
        await PostModel.updateOne({ _id: id }, { title, body, imagePath: path.join("/uploads", filename) }); 
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
}