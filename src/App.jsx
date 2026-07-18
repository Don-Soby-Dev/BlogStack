import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BlogList from "./pages/BlogList";
import AddEditBlog from "./pages/AddEditBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogList />} />
      <Route path="/blogs/new" element={<AddEditBlog />} />
      <Route path="/blogs/edit/:id" element={<AddEditBlog />} />
    </Routes>
  );
}

export default App;
