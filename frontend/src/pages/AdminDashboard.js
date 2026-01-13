function AdminDashboard() {
  return (
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        flexDirection: "column",
      }}
    >
      <h2>Admin Dashboard</h2>
      <p>Welcome to Medimatch Admin Panel</p>
      <a href="/admin/hospitals">Manage Hospitals</a>
    </div>
  );
}
 
export default AdminDashboard;
