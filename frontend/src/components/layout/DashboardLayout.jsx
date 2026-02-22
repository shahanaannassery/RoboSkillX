import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const userName = localStorage.getItem("user_name") || "Learner";
  const userEmail = localStorage.getItem("user_email") || "";

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Virtual Robotics Lab", icon: Cpu, path: "/simulation" },
    { name: "Projects", icon: Folder, path: "/projects" },
    { name: "Mentors", icon: Users, path: "/mentors" },
    { name: "Points & Badges", icon: Trophy, path: "/badges" },
    { name: "Subscription", icon: CreditCard, path: "/subscription" },
    { name: "Support", icon: LifeBuoy, path: "/support" },
    { name: "AI Assistant", icon: Bot, path: "/assistant" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          width: collapsed ? 80 : 250,
        }}
      >
        {/* LOGO */}
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
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0px)";
                }}
                style={{
                  ...styles.menuItem,
                  ...(isActive && styles.activeMenuItem),
                }}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div style={styles.logoutBox}>
          <div style={styles.divider} />
          <div
            style={styles.logout}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>
            {menu.find((m) => m.path === location.pathname)?.name ||
              "Dashboard"}
          </h2>

          <div style={styles.headerRight}>
            <MessageCircle size={20} />
            <Bell size={20} />

            <div style={styles.profile}>
              <div style={styles.avatar}>{userName[0]}</div>
              <div>
                <div style={styles.name}>{userName}</div>
                <div style={styles.email}>{userEmail}</div>
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
  },

  logoText: {
    fontWeight: "bold",
    color: "#011C40",
    flex: 1,
  },

  toggle: {
    cursor: "pointer",
  },

  /* MENU */
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    margin: "6px 14px",   // 👈 Slim highlight width
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s ease",
  },

  activeMenuItem: {
    background: "#8FD6DE",
    fontWeight: "bold",
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

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  name: { fontWeight: "bold" },
  email: { fontSize: 12 },

  content: {
    flex: 1,
    padding: 24,
  },

  footer: {
    background: "#8FD6DE",
    textAlign: "center",
    padding: 10,
  },
};