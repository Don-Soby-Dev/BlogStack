import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BlogList from "./pages/BlogList";
import AddEditBlog from "./pages/AddEditBlog";
import BlogDetail from "./pages/BlogDetail";
import BlogsLayout from "./components/layout/BlogsLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/blogs" element={<BlogsLayout />}>
        <Route index element={<BlogList />} />
        <Route path=":id" element={<BlogDetail />} />
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <AddEditBlog />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <ProtectedRoute>
              <AddEditBlog />{" "}
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
