export function home(req, res) {
  res.render("index", {
    title: "Home Page",
    content: "This is Home Page",
    user: req.user,
  });
}

export function about(req, res) {
  res.render("about", {
    title: "About Page",
    content: "This is About Page",
    user: req.user,
  });
}

export function contact(req, res) {
  res.render("contact", {
    title: "Contact Page",
    content: "This is Contact Page",
    user: req.user,
  });
}
