// src/pages/AuthPage.jsx
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const { currentUser } = useAuth();

  // If they are already logged in, redirect them straight to the blog list.
  if (currentUser) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          BlogStack
        </h1>
        <p className="text-center text-sm text-gray-600">
          Share your thoughts with the world.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
