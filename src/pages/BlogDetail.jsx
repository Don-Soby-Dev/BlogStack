// src/pages/BlogDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPostById, deletePost } from "../firebase/firestore";
import Header from "../components/layout/Header";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the post when component mounts or id changes
  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError("");
        const fetchedPost = await getPostById(id);

        if (!fetchedPost) {
          setError("Blog post not found.");
          return;
        }

        setPost(fetchedPost);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deletePost(post.id);
      navigate("/"); // Redirect to home after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  // Check if current user is the author
  const isAuthor = currentUser?.uid === post?.authorId;

  // Format the date
  const formattedDate = post?.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-red-600 text-lg mb-4">
              {error || "Post not found"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {/* Blog Post Content */}
        <article className="bg-white rounded-lg shadow-md p-8 sm:p-12">
          {/* Author and Date */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              By{" "}
              <span className="font-semibold text-gray-700">
                {post.authorName}
              </span>
            </p>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Full Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Action Buttons (Only for the author) */}
          {isAuthor && (
            <div className="flex gap-3 mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate(`/edit-blog/${post.id}`)}
                className="flex-1 py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit Post
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete Post
              </button>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
