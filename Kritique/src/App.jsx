import { Routes, Route, Link } from 'react-router-dom' 
import './App.css'
import NavBar from './components/NavBar'
import CreatePostPage from './pages/CreatePostPage'
import GalleryPage from './pages/GalleryPage'
import FullPostPage from './pages/FullPostPage' 
import EditPostPage from './pages/EditPostPage';
import HomeFeed from './components/HomeFeed';
import Header from './components/Header';

function App() {

  return (
    <>
      <Header />
      <Routes>
          {/* Home Route */}
          <Route path="/" element={
              <>
              {/* Hero Section at the top! */}
              <section className="hero-container">
                <div className='hero-content'>
                    <h1 className='hero-title'> Constructive feedback and a safe space to improve!</h1>
                    <Link to="/create">
                      <button className="hero-btn"> <b>Create New Post</b> </button>
                    </Link>
                  </div>
              </section>
              
              {/* */}
              {/* Popular Posts  Section and a link to the full gallery*/}
              <section className='post-container'>
                <h2 className='section-header'>Recent Posts:</h2>
                <div className='posts-view'>
                  {/* shwo the post previews here*/}
                  <HomeFeed />
                </div>
                <Link to="/gallery">
                  <button className="gallery-btn"><b>View Full Gallery</b></button>
                </Link>
              </section>

              {/*Instructions Section */}
              <section className="how-it-works">
                  <h2 className="section-header">How It Works</h2>
                  <div className="steps-container">
                      <div className="step-card">
                          <div className="step-icon">📝</div>
                          <h3>Create</h3>
                          <p>Share your latest project or idea to get feedback from the community.</p>
                      </div>
                      <div className="step-card">
                          <div className="step-icon">🔍</div>
                          <h3>Explore</h3>
                          <p>Browse the gallery to see what others are building and find inspiration.</p>
                      </div>
                      <div className="step-card">
                          <div className="step-icon">💬</div>
                          <h3>Interact</h3>
                          <p>Upvote great ideas and leave helpful comments to help others improve.</p>
                      </div>
                  </div>
              </section>

              {/* footer: about link, contant link, report a post.*/}
              {/* Informative Footer */}
              <footer className="app-footer">
                  <div className="footer-content">
                      <div className="footer-section">
                          <h4>About</h4>
                          <p>A community-driven platform for constructive feedback and creative growth.</p>
                      </div>
                      <div className="footer-section">
                          <h4>Quick Links</h4>
                          <Link to="/gallery">Full Gallery</Link>
                          <Link to="/create">Create Post</Link>
                      </div>
                      <div className="footer-section">
                          <h4>Support</h4>
                          <a href="mailto:support@example.com">Contact Us</a>
                          <a href="#">Report a Post</a>
                      </div>
                  </div>
                  <div className="footer-bottom">
                      <p>&copy; 2024 Feedback Gallery. All rights reserved.</p>
                  </div>
              </footer>
            </>
            } />

          {/* All Routes */}
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/post/:id" element={<FullPostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
    </>
  )
}

export default App
