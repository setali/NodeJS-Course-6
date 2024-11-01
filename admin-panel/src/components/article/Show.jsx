import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import request from "../../utils/request";
import Loading from "../general/Loading";
import { Link } from "react-router-dom";
import Page404 from "../general/404";
import Error from "../general/Error";

export default function Show() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["article", id],
    queryFn: () => request(`/article/${id}`).then(({ data }) => data),
  });

  if (isLoading) return <Loading />;

  console.log(error);
  if (error) {
    return (
      <Error
        status={error.response.data.code}
        title={error.response.data.message}
      />
    );
  }

  return (
    <div>
      <h2>{data.title}</h2>
      Author: <h3>{data.user.username}</h3>
      <Link to="/article">Back to list</Link>
    </div>
  );
}
