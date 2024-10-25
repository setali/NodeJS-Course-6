import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import request from "../../utils/request";
import Loading from "../general/Loading";
import { Link } from "react-router-dom";

export default function Show() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["article", id],
    queryFn: () => request(`/article/${id}`).then(({ data }) => data),
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2>{data.title}</h2>
      Author: <h3>{data.user.username}</h3>
      <Link to="/article">Back to list</Link>
    </div>
  );
}
