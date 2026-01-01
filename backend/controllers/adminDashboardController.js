const dashboardController = (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    adminId: req.admin.id
  });
};

module.exports = { dashboardController };
