export function home(req, res) {
  res.render("index", {
    title: "Home Page",
    content: "This is Home Page",
  });
}

export function about(req, res) {
  res.render("about", {
    title: "About Page",
    content: "This is About Page",
  });
}

export function contact(req, res) {
  res.render("contact", {
    title: "Contact Page",
    content: "This is Contact Page",
  });
}
