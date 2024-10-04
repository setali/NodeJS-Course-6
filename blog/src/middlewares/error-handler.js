export default (error, req, res, next) => {
  console.log(error.message);
  console.log(error.status);
  console.log(req.method);
  console.log(req.url);
  const status = error.status || 500;
  const message =
    process.env.NODE_ENV === "development" || status < 500
      ? error.message
      : "Server error, Please call to administrator";
  res.status(status).render("error", {
    title: `Error: ${status}`,
    content: message,
  });
};
