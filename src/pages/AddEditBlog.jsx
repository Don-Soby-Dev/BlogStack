import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/blog/BlogForm";
import { createPost, updatePost } from "../firebase/firestore";

const AddEditBlog = () => {
  const { id } = useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingPost, setExistingPost] = useState(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      async function fetchPost() {
        try {
          setLoading(true);
          const post = await getPostById(id);

          if (!post) {
            setError("Blog post not found.");
            return;
          }

          if (post.authorId !== currentUser.uid) {
            setError("you don't have permission to edit this post.");
            return;
          }

          setExistingPost(post);
        } catch (err) {
          console.error("Error while fetching post: ", err);
          setError("Failed to load blog post.");
        } finally {
          setLoading(false);
        }
      }
      fetchPost();
    }
  }, [id, isEditMode, currentUser.uid]);

  async function handleSubmit(formData) {
    setError("");
    setLoading(true);

    try {
      if (isEditMode) {
        await updatePost(id, {
          title: formData.title,
          content: formData.content,
        });
      } else {
        await createPost(
          formData.title,
          formData.content,
          currentUser.uid,
          currentUser.email,
        );
      }

      navigate("/blogs");
    } catch (err) {
      console.error("Error while saving Post: ", err);
      setError("Failed to save blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isEditMode ? "Edit Blog Post" : "Create a New Blog Post"}
          </h1>

          {loading && isEditMode ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading post...</p>
            </div>
          ) : (
            <BlogForm
              initialTitle={existingPost?.title || ""}
              initialContent={existingPost?.content || ""}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-4 py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
