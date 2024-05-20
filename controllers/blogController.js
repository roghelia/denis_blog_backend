import Blog from "../models/blog.model.js";

const createBlog = async (req, res) => {
    const { title, author, description, image } = req.body;

    if(!title || !author || !description || !image) {
        throw new Error("Fill all the details.")
    }

    const newBlog = await Blog.create({title, author, description, image})

    try {
        newBlog.save();
        res.status(200).send("Successfully created a blog.")
    } catch (error) {
        res.send("Unsuccessful.")
    }
}

const getAllBlogs = async (req, res) => {
    const blogs = Blog.find({})

    res.json(blogs)
}

const deleteBlog = async (req, res) => {
    const { title } = req.body;

    const blogExists = Blog.findOne({title})

    if(blogExists){
        try {
            const delBlog = Blog.deleteOne({title})
            if(delBlog) {
                res.status(200).send("Deleted successfully.")
            } else {
                res.send("unsuccessful, while deleting the blog.")
            }
        } catch (error) {
            throw new Error (error)
        }
    }
}

const updateBlog = async (req, res) => {
    const { title, author, description, image } = req.body;

    const blogExists = Blog.findOne({title})

    if(blogExists){
        blogExists.title = title 
        blogExists.author = author
        blogExists.description = description
        blogExists.image = image
    }
}

export {createBlog, getAllBlogs, deleteBlog, updateBlog}