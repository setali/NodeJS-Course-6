import React from "react";
import { Layout } from "antd";
import Sidebar from "./general/Sidebare";
import { Route, Routes } from "react-router";
import Dashboard from "./general/Dashboard";
import ArticleRouter from "./article/Router";
import Page404 from "./general/404";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>Header</Header>
      <Layout>
        <Sider width="20%">
          <Sidebar />
        </Sider>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/article/*" element={<ArticleRouter />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
