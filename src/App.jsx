import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BlogList from "./pages/BlogList";
import AddEditBlog from "./pages/AddEditBlog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/blogs/new" element={<AddEditBlog />} />
      <Route path="/blogs/edit/:id" element={<AddEditBlog />} />
    </Routes>
  );
}

export default App;
