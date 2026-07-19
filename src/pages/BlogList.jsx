// src/pages/BlogList.jsx
import { useState, useEffect } from "react";
import { getPosts } from "../firebase/firestore";
import BlogCard from "../components/blog/BlogCard";
import Header from "../components/layout/Header";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all posts when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Callback function to remove a post from the list after deletion
  function handleDelete(deletedPostId) {
    setPosts(posts.filter((post) => post.id !== deletedPostId));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Latest Blog Posts
          </h1>
          <p className="text-gray-600">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-2">No blog posts yet</p>
            <p className="text-gray-500 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
