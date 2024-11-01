import React from "react";
import { Routes, Route } from "react-router";
import List from "./List";
import Page404 from "../general/404";
import Show from "./Show";
import Add from "./Add";
import Edit from "./Edit";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/add" element={<Add />} />
      <Route path="/:id" element={<Show />} />
      <Route path="/:id/edit" element={<Edit />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
