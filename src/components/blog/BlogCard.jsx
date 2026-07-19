// src/components/blog/BlogCard.jsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../firebase/firestore";

export default function BlogCard({ post, onDelete }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Check if the logged-in user is the author of this post
  const isAuthor = currentUser?.uid === post.authorId;

  async function handleDelete() {
    // Confirm before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmed) return;

    try {
      await deletePost(post.id);
      onDelete(post.id); // Tell the parent to remove this post from the list
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  }

  // Format the date nicely
  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header: Author and Date */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            By{" "}
            <span className="font-semibold text-gray-700">
              {post.authorName}
            </span>
          </p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

        {/* Action Buttons (Only show if user is the author) */}
        {isAuthor && (
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={() => navigate(`edit/${post.id}`)}
              className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 font-semibold rounded-md hover:bg-blue-100 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 px-4 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
