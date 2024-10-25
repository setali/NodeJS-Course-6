import React from "react";
import { Routes, Route } from "react-router";
import List from "./List";
import Page404 from "../general/404";
import Show from "./Show";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Show />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
