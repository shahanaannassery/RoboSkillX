import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Cpu,
  Folder,
  Users,
  Trophy,
  CreditCard,
  LifeBuoy,
  Bot,
  User,
  Settings,
  LogOut,
  Bell,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const userName = localStorage.getItem("user_name") || "Learner";

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Courses", icon: BookOpen },
    { name: "Virtual Robotics Lab", icon: Cpu },
    { name: "Projects", icon: Folder },
    { name: "Mentors", icon: Users },
    { name: "Points & Badges", icon: Trophy },
    { name: "Subscription", icon: CreditCard },
    { name: "Support", icon: LifeBuoy },
    { name: "AI Assistant", icon: Bot },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div style={styles.page}>
      {/* ===== SIDEBAR ===== */}
      <div
        style={{
          ...styles.sidebar,
          width: collapsed ? 80 : 250,
        }}
      >
        {/* LOGO + TOGGLE */}
        <div style={styles.logoRow}>
          <div style={styles.logoBox}>🤖</div>

          {!collapsed && <span style={styles.logoText}>RoboSkillX</span>}

          <div
            style={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </div>
        </div>

        {/* MENU */}
        <div style={{ flex: 1 }}>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} style={styles.menuItem}>
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div style={styles.logoutBox}>
          <div style={styles.divider} />
          <div style={styles.logout} onClick={() => navigate("/")}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* ===== MAIN AREA ===== */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "#011C40" }}>Learner Dashboard</h2>

          <div style={styles.headerRight}>
            <MessageCircle size={20} style={styles.headerIcon} />
            <Bell size={20} style={styles.headerIcon} />

            <div style={styles.profile}>
              <div style={styles.avatar}>{userName[0]}</div>
              <div>
                <div style={styles.name}>{userName}</div>
                <div style={styles.email}>Learner</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>{children}</div>

        {/* FOOTER */}
        <div style={styles.footer}>© 2026 RoboSkillX</div>
      </div>
    </div>
  );
}

export default DashboardLayout;

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    background: "#A7EBF2",
    fontFamily: "sans-serif",
  },

  /* SIDEBAR */
  sidebar: {
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
    boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 18,
  },

  logoBox: {
    width: 38,
    height: 38,
    background: "#26658C",
    color: "#fff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },

  logoText: {
    fontWeight: "bold",
    color: "#011C40",
    flex: 1,
  },

  toggle: {
    cursor: "pointer",
    color: "#023859",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 18px",
    cursor: "pointer",
    color: "#023859",
    fontSize: 14,
  },

  logoutBox: { padding: 16 },
  divider: { height: 1, background: "#eee", marginBottom: 10 },

  logout: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    color: "#D9534F",
  },

  /* MAIN */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background: "#8FD6DE",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  headerIcon: {
    cursor: "pointer",
    color: "#023859",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  name: { fontWeight: "bold", color: "#011C40" },
  email: { fontSize: 12, color: "#023859" },

  content: {
    flex: 1,
    padding: 24,
    overflowY: "auto",
  },

  footer: {
    background: "#8FD6DE",
    textAlign: "center",
    padding: 10,
    color: "#023859",
    fontSize: 13,
  },
};
