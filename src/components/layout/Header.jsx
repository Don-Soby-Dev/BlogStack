// src/components/layout/Header.jsx
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/blogs"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            BlogStack
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link
                  to="/blogs/new"
                  className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  + New Post
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Log In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
