// src/components/HomeFeed.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; 
import PostPreview from './PostPreview';
import './HomeFeed.css'; // Import the new styles

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .order('created_at', { ascending: false })
                .limit(3); 

            if (error) {
                console.error("Error fetching recent posts:", error);
            } else {
                setPosts(data);
            }
        };
        fetchRecentPosts();
    }, []);

    return (
        <div className="home-feed-container">
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <PostPreview 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        created_at={post.created_at}
                        upvotes={post.upvotes}
                    />
                ))
            ) : (
                <p className="no-posts">No recent posts yet.</p>
            )}
        </div>
    );
};

export default HomeFeed;
