import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function BlogsLayout() {
  return (
    <div className="min-h-screen bg-grey-50">
      <Header />
      <Outlet />
    </div>
  );
}

export default BlogsLayout;
