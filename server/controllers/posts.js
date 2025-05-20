import PostModel from "../models/Post.js";

export const getPost = async (req, res) => {
    const id = req.params.id;

    const post = await PostModel.findOne({ _id: id })

    if (!post) {
        return res.status(404).json({ message: "Post not found"})
    }

    res.status(200).json(post);
}

export const getPosts = async (req, res) => {
    const posts = await PostModel.find({}); 
    res.status(200).json(posts);
}