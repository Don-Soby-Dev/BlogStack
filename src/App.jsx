import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<Blog />} />
      <Route path="/blogs/new" element={<CreateBlog />} />
      <Route path="/blogs/:id/edit" element={<CreateBlog />} />
    </Routes>
  );
}

export default App;
