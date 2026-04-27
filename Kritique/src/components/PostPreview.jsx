// a box that shows a little bit of info about a post, like it's image and title.
// src/components/PostPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PostPreview.css'; 

const PostPreview = ({ id, title, created_at, upvotes }) => {
    
    const formatDate = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Link to={`/post/${id}`} className="post-preview-link">
            <div className="post-preview-card">
                <div className="preview-content">
                    <p className="post-time">Posted on {formatDate(created_at)}</p>
                    <h3 className="post-title">{title}</h3>
                    <p className="post-upvotes">{upvotes} upvotes</p>
                </div>
            </div>
        </Link>
    );
};

export default PostPreview;