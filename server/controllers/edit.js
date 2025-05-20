import PostModel from "../models/Post.js";

export const putEdit = async (req, res) => {
    const { title, body, id } = req.body
    try {
        await PostModel.updateOne({ _id: id }, { title, body }); 
        res.status(200).send();
    } catch {
        res.status(400).send();
    }
}