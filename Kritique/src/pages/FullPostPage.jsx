// the page that contains ALL of a posts information, and is linked to a post's preview
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import './FullPostPage.css';

const FullPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchPostAndComments = async () => {
            // Fetch post data
            const { data: postData } = await supabase.from('posts').select().eq('id', id).single();
            setPost(postData);

            // Fetch comments for this post
            const { data: commentData } = await supabase.from('comments').select().eq('post_id', id);
            setComments(commentData || []);
        };
        fetchPostAndComments();
    }, [id]);

    const handleUpvote = async () => {
        const { data } = await supabase
            .from('posts')
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id)
            .select();
        setPost(data[0]);
    };

    const handleDelete = async () => {
        await supabase.from('posts').delete().eq('id', id);
        navigate('/gallery'); // Redirect back to gallery after deletion
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        const { data } = await supabase
            .from('comments')
            .insert({ post_id: id, text: newComment })
            .select();
        setComments([...comments, data[0]]);
        setNewComment("");
    };

    if (!post) return <div className="loading">Loading...</div>;

    return (
        <div className="full-post-container">
            <div className="post-detail-card">
                <p className="post-meta">Posted on {new Date(post.created_at).toLocaleString()}</p>
                <h1 className="post-title">{post.title}</h1>
                {post.content && <p className="post-content">{post.content}</p>}
                {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
                
                <div className="post-actions">
                    <button onClick={handleUpvote} className="upvote-btn">👍 {post.upvotes} Upvotes</button>
                    <Link to={`/edit/${id}`} className="edit-link-btn">Edit Post</Link>
                    <button onClick={handleDelete} className="delete-btn">Delete Post</button>
                </div>
            </div>

            <div className="comments-section">
                <h3>Comments</h3>
                <div className="comment-list">
                    {comments.map((c, i) => (
                        <p key={i} className="comment-item">- {c.text}</p>
                    ))}
                </div>
                <form onSubmit={handleAddComment} className="comment-form">
                    <input 
                        type="text" 
                        placeholder="Leave a comment..." 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default FullPostPage;