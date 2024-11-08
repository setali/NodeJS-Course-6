class FileController {
  upload(req, res) {
    return res.json({
      path: req.file.path.split("/").splice(1).join("/"),
    });
  }
}

export default new FileController();
