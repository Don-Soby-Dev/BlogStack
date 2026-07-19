// src/components/blog/BlogCard.jsx
import { useNavigate } from "react-router-dom";

export default function BlogCard({ post }) {
  const navigate = useNavigate();

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div
      onClick={() => navigate(`/blogs/${post.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer group"
    >
      <div className="p-6">
        {/* Author and Date */}
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
        <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

        {/* Read More Link */}
        <p className="text-blue-600 font-medium text-sm group-hover:underline">
          Read more →
        </p>
      </div>
    </div>
  );
}
