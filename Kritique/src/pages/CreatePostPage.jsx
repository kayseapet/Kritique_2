//the page where user create a whole new post

import React, { useState } from 'react';
import { supabase } from '../client'; // Adjust path to your client file
import './CreatePostPage.css';

const CreatePostPage = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const createPost = async (event) => {
        event.preventDefault();

        // API call to Supabase to insert a new row
        const { error } = await supabase
            .from('posts')
            .insert({ 
                title: post.title, 
                content: post.content, 
                image_url: post.image_url,
                upvotes: 0 // Initialize upvotes to 0 as required
            })
            .select();

        if (error) {
            console.log(error);
        } else {
            window.location = "/gallery"; // Redirect to home feed after creation
        }
    };

    return (
        <div className="create-post-container">
            <h1 className="section-header">Create a New Post</h1>
            <form className="create-form" onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter post title" 
                    required 
                    onChange={handleChange} 
                /> <br />

                <label htmlFor="content">Content (Optional)</label><br />
                <textarea 
                    rows="5" 
                    cols="50" 
                    id="content" 
                    name="content" 
                    placeholder="Describe your project or ask for feedback..." 
                    onChange={handleChange}
                ></textarea><br />

                <label htmlFor="image_url">Image URL (Optional)</label><br />
                <input 
                    type="text" 
                    id="image_url" 
                    name="image_url" 
                    placeholder="Paste an external image link" 
                    onChange={handleChange} 
                /><br />

                <input type="submit" value="Submit Post" className="hero-btn" />
            </form>
        </div>
    );
};

export default CreatePostPage;