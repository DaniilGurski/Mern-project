import PostModel from "../models/Post.js";

export const getPost = async (req, res) => {
    const id = parseInt(req.params.id);

    const post = await PostModel.findOne({ id })

    if (!post) {
        return res.status(404).json({ message: "Post not found"})
    }

    res.status(200).json(post);
}