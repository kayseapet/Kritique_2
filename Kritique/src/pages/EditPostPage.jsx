import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'; 
import './CreatePostPage.css'; 

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "", image_url: "" });

    
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('posts')
                .select()
                .eq('id', id)
                .single();

            if (data) {
                setPost({
                    title: data.title,
                    content: data.content,
                    image_url: data.image_url
                });
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        const { error } = await supabase
            .from('posts')
            .update({ 
                title: post.title, 
                content: post.content, 
                image_url: post.image_url 
            })
            .eq('id', id);

        if (error) {
            console.log(error);
        } else {
            // Redirect back to the post's detail page after editing
            navigate(`/post/${id}`);
        }
    };

    return (
        <div className="create-post-container">
            <h1 className="section-header">Update Your Post</h1>
            <form className="create-form" onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={post.title} // Controlled component
                    required 
                    onChange={handleChange} 
                /> <br />

                <label htmlFor="content">Content (Optional)</label><br />
                <textarea 
                    rows="5" 
                    cols="50" 
                    id="content" 
                    name="content" 
                    value={post.content} // Controlled component
                    onChange={handleChange}
                ></textarea><br />

                <label htmlFor="image_url">Image URL (Optional)</label><br />
                <input 
                    type="text" 
                    id="image_url" 
                    name="image_url" 
                    value={post.image_url} // Controlled component
                    onChange={handleChange} 
                /><br />

                <input type="submit" value="Update Post" className="hero-btn" />
            </form>
        </div>
    );
};

export default EditPostPage;