import React, { useEffect, useState } from "react";

function BlogForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  loading,
  error,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Enter your blog title..."
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="content"
          className="text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Write your blog post content here..."
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 10 characters</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        {loading ? "Saving..." : initialTitle ? "Update Blog" : "Publish Blog"}
      </button>
    </form>
  );
}

export default BlogForm;
