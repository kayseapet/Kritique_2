// page that shows a grid of post previews, and supports filtering
import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; 
import PostPreview from '../components/PostPreview';
import './GalleryPage.css'; 

function GalleryPage() {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at'); 
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            // Build the query
            let query = supabase
                .from('posts')
                .select()
                .order(orderBy, { ascending: false });

            // If there is search input, filter by title
            if (searchInput.length > 0) {
                query = query.ilike('title', `%${searchInput}%`); // Case-insensitive search
            }

            const { data, error } = await query;

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                setPosts(data);
            }
        };
        fetchPosts();
    }, [orderBy, searchInput]); // Refetch when sort OR search changes

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h1 className="section-header">Community Gallery</h1>
                
                <div className="sort-controls">
                    <span>Sort by: </span>
                    <button 
                        className={orderBy === 'created_at' ? 'active-sort' : ''}
                        onClick={() => setOrderBy('created_at')}
                    >
                        Newest
                    </button>
                    <button 
                        className={orderBy === 'upvotes' ? 'active-sort' : ''}
                        onClick={() => setOrderBy('upvotes')}
                    >
                        Most Popular
                    </button>
                </div>
                {/* Search Bar Input */}
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search by title..." 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>

            <div className="posts-grid">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <PostPreview 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content} // Added content prop
                            created_at={post.created_at}
                            upvotes={post.upvotes}
                        />
                    ))
                ) : (
                    <p className="no-posts">No posts found.</p>
                )}
            </div>
        </div>
    );
}

export default GalleryPage;