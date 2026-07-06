import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import api from "../../services/axios";

import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  DollarSign,
  Wallet,
  User,
  Settings,
  MessageCircle,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ClipboardList,
  Bot,
} from "lucide-react";

function MentorLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const mentorName = localStorage.getItem("user_name") || "Mentor";
  const mentorEmail = localStorage.getItem("user_email") || "";

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/mentor/dashboard" },
    // { name: "Session Requests", icon: ClipboardList, path: "/mentor/session-requests" },
    { name: "My Sessions", icon: Calendar, path: "/mentor/my-sessions" },
    { name: "Courses", icon: BookOpen, path: "/mentor/courses" },
    { name: "Student Progress", icon: GraduationCap, path: "/mentor/student-progress" },
    { name: "Students", icon: Users, path: "/mentor/students" },
    { name: "Earnings", icon: DollarSign, path: "/mentor/earnings" },
    { name: "Wallet", icon: Wallet, path: "/mentor/wallet" },
    { name: "Profile", icon: User, path: "/mentor/profile" },
    { name: "Settings", icon: Settings, path: "/mentor/settings" },
  ];

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <div style={{ ...styles.sidebar, width: collapsed ? 80 : 260 }}>

        {/* LOGO */}
        <div style={styles.logoRow}>
          <div style={styles.logoBox}>
            <Bot size={22} />
          </div>
          {!collapsed && <span style={styles.logoText}>RoboSkillX</span>}
          <div style={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </div>
        </div>

        {/* MENU */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#EAF8FA";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0px)";
                  }
                }}
                style={{ ...styles.menuItem, ...(isActive ? styles.activeMenuItem : {}) }}
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
            onMouseEnter={(e) => { e.currentTarget.style.color = "#B52B27"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#D9534F"; }}
            onClick={async () => {
              try {
                await api.post("/accounts/logout/");
                localStorage.clear();
                navigate("/");
              } catch (err) {
                console.error(err);
              }
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
          <h2 style={{ margin: 0 }}>Mentor Portal</h2>

          <div style={styles.headerRight}>
            <MessageCircle
              size={20}
              style={{ cursor: "pointer", transition: "all .2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#26658C";
                e.currentTarget.style.transform = "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#011C40";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <Bell
              size={20}
              style={{ cursor: "pointer", transition: "all .2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#26658C";
                e.currentTarget.style.transform = "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#011C40";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <div style={styles.profile}>
              <div style={styles.avatar}>{mentorName.charAt(0)}</div>
              <div>
                <div style={styles.name}>{mentorName}</div>
                <div style={styles.email}>{mentorEmail}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <Outlet />
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          © 2026 RoboSkillX Mentor Portal
        </div>
      </div>
    </div>
  );
}

export default MentorLayout;

const styles = {
  page: {
    display: "flex",
    height: "100vh",        /* FIX: was minHeight — page grew taller than viewport, sidebar fell short */
    background: "#A7EBF2",
    overflow: "hidden",     /* clips outer shell; scrolling happens inside content */
  },

  sidebar: {
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s",
    flexShrink: 0,
    boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
    height: "100%",         /* FIX: was 100vh + sticky — use 100% to fill parent */
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 18,
  },

  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontWeight: "700",
    color: "#011C40",
    flex: 1,
  },

  toggle: {
    cursor: "pointer",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    margin: "4px 12px",
    borderRadius: "12px",
    cursor: "pointer",
    color: "#011C40",
    transition: "all 0.25s ease",
  },

  activeMenuItem: {
    background: "#26658C",
    color: "#FFFFFF",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(38,101,140,0.25)",
  },

  logoutBox: {
    padding: 16,
    marginTop: "auto",
  },

  divider: {
    height: 1,
    background: "#ddd",
    marginBottom: 10,
  },

  logout: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#D9534F",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",     /* scroll stays inside content div below */
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

  name: {
    fontWeight: "bold",
  },

  email: {
    fontSize: 12,
  },

  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    width: "100%",
    boxSizing: "border-box",
  },

  footer: {
    background: "#8FD6DE",
    textAlign: "center",
    padding: "12px",
    borderTop: "1px solid #54ACBF",
  },
};