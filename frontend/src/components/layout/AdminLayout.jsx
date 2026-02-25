import { Outlet, NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBook,
  FiCalendar,
  FiMessageCircle,
  FiDollarSign,
  FiCreditCard,
  FiLayers,
  FiSettings,
  FiLogOut,
  FiBell,
} from "react-icons/fi";

function AdminLayout() {
  const adminName = localStorage.getItem("admin_name") || "Admin";

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Mentor Approval", path: "/admin/mentor-approval", icon: <FiUserCheck /> },
    { name: "Courses", path: "/admin/courses", icon: <FiBook /> },
    { name: "Sessions", path: "/admin/sessions", icon: <FiCalendar /> },
    { name: "Support", path: "/admin/support", icon: <FiMessageCircle /> },
    { name: "Earnings", path: "/admin/earnings", icon: <FiDollarSign /> },
    { name: "Withdrawals", path: "/admin/withdrawals", icon: <FiCreditCard /> },
    { name: "Subscriptions", path: "/admin/subscriptions", icon: <FiLayers /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  return (
    <div style={styles.layout}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>

        {/* LOGO (Same Line) */}
        <div style={styles.logoWrapper}>
          <div style={styles.logoIcon}>🤖</div>
          <div style={styles.logoText}>RoboSkillX</div>
        </div>

        {/* MENU */}
        <div style={styles.menuContainer}>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.menuItem,
                background: isActive ? "#666B64" : "transparent",
                color: isActive ? "#FFFFFF" : "#171F22",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.style.background.includes("#666B64")) {
                  e.currentTarget.style.transform = "translateX(6px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0px)";
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* LOGOUT */}
        <div style={styles.logoutSection}>
  <NavLink to="/admin/login" style={styles.logoutBtn}>
    <FiLogOut style={{ marginRight: 10, color: "#D64545" }} />
    Logout
  </NavLink>
</div>

      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>

        {/* HEADER */}
        <div style={styles.header}>
          <FiBell style={styles.bell} />
          <div style={styles.profileWrap}>
            <div style={styles.profileCircle}>
              {adminName.charAt(0).toUpperCase()}
            </div>
            <span style={styles.adminName}>{adminName}</span>
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#C1D1CF",
    fontFamily: "Inter, sans-serif",
  },

  sidebar: {
    width: "250px",
    background: "#A9BBB9",
    padding: "20px 15px",
    display: "flex",
    flexDirection: "column",
  },

  /* LOGO SAME LINE */
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  },

  logoIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#666B64",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },

  logoText: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#171F22",
  },

  menuContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.25s ease",
  },

  icon: {
    fontSize: "16px",
  },

  logoutSection: {
    borderTop: "1px solid rgba(0,0,0,0.15)",
    paddingTop: "15px",
  },

logoutBtn: {
  display: "flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "14px",
  color: "#171F22",   // normal text color
},

  rightSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

header: {
  height: "70px",
  background: "#B8C9C7",   // slightly darker than page background
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 30px",
  gap: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",  // soft separation
  borderBottom: "1px solid rgba(0,0,0,0.05)",
},

  bell: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#171F22",
  },

  profileWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  profileCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#666B64",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "14px",
  },

  adminName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#171F22",
  },

  content: {
    flex: 1,
    padding: "30px",
  },
};