import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Sidebar from "./general/Sidebare";
import { Route, Routes } from "react-router";
import Dashboard from "./general/Dashboard";
import ArticleRouter from "./article/Router";
import Page404 from "./general/404";
import Login from "./auth/Login";
import request from "../utils/request";
import { getToken, removeRefreshToken, removeToken } from "../utils/tools";
import Loading from "./general/Loading";
import ChatApp from "./chat/ChatApp";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  function getUser() {
    request("/user")
      .then(({ data }) => {
        setUser(data);
        setIsLoggedIn(true);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (getToken()) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  function logout() {
    removeToken();
    removeRefreshToken();
    setIsLoggedIn(false);
    setUser({});
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoggedIn ? (
        <>
          <Header style={{ color: "white" }}>
            Welcome {user.username}
            <span
              onClick={logout}
              style={{ marginLeft: "1rem", color: "red", cursor: "pointer" }}
            >
              Logout
            </span>
          </Header>
          <Layout>
            <Sider width="20%">
              <Sidebar />
            </Sider>
            <Content style={{ padding: "1rem" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/article/*" element={<ArticleRouter />} />
                <Route path="/chat" element={<ChatApp />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </>
      ) : (
        <Login getUser={getUser} />
      )}
    </Layout>
  );
}

export default App;
