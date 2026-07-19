import { Navigate, Route, Routes } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogsLayout from "./components/layout/BlogsLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { lazy, Suspense } from "react";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AddEditBlog = lazy(() => import("./pages/AddEditBlog"));

function App() {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
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
    </Suspense>
  );
}

export default App;
