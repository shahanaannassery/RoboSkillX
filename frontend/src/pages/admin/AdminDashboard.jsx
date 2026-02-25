import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
    const navigate = useNavigate();
  return (
    <div style={styles.container}>
      {/* ===== TOP CARDS ===== */}
      <div style={styles.topCards}>
        {stats.map((item, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.cardTitle}>{item.title}</p>
            <h2 style={styles.cardValue}>{item.value}</h2>
            <p style={styles.cardSub}>{item.sub}</p>
          </div>
        ))}
      </div>

      {/* ===== ACTION + EARNINGS ===== */}
      <div style={styles.row}>
        {/* Action Required */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3>Action Required</h3>
            <span style={styles.badge}>18 Tasks</span>
          </div>

          {actions.map((item, i) => (
            <div key={i} style={styles.actionRow}>
              <div>
                <strong>{item.title}</strong>
                <p style={styles.small}>{item.sub}</p>
              </div>
              <button
  style={styles.viewBtn}
  onClick={() => {
    if (item.title === "Mentor Approvals") {
      navigate("/admin/mentor-approval");
    }
  }}
>
  View
</button>
            </div>
          ))}
        </div>

        {/* Earnings Overview */}
        <div style={{ ...styles.card, flex: 2 }}>
          <h3>Earnings Overview</h3>
          <p style={styles.small}>Financial performance last 30 days</p>

          <div style={styles.earningRow}>
            <div style={styles.miniCard}>
              <p>Total Revenue</p>
              <h3>$12,450</h3>
            </div>
            <div style={styles.miniCard}>
              <p>Mentor Allocated</p>
              <h3>$8,240</h3>
            </div>
            <div style={styles.miniCard}>
              <p>Pending Payout</p>
              <h3>$1,850</h3>
            </div>
          </div>

          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#666B64"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== TODAY'S OPERATIONS ===== */}
      <div style={styles.card}>
  <div style={styles.cardHeader}>
    <h3 style={{ margin: 0 }}>Today's Operations</h3>
    <button style={styles.viewAllBtn}>View All Sessions</button>
  </div>

  <table style={styles.table}>
    <thead style={styles.thead}>
    <tr>
      <th style={styles.th}>Learner</th>
      <th style={styles.th}>Mentor</th>
      <th style={styles.th}>Course Module</th>
      <th style={styles.th}>Time (UTC)</th>
      <th style={styles.th}>Status</th>
      <th style={{ ...styles.th, textAlign: "right" }}>Action</th>
    </tr>
  </thead>

  <tbody>
    {sessions.map((row, index) => (
      <tr
        key={index}
        style={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <td style={styles.td}>{row.learner}</td>
        <td style={styles.td}>{row.mentor}</td>
        <td style={styles.td}>{row.course}</td>
        <td style={styles.td}>{row.time}</td>
        <td style={styles.td}>
          <span style={styles.statusBadge(row.status)}>
            {row.status}
          </span>
        </td>
        <td style={{ ...styles.td, textAlign: "right" }}>
          <button style={styles.actionBtn}>
            {row.action}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
  </table>
</div>
      {/* ===== SUBSCRIPTION + ACTIVITY ===== */}
      <div style={styles.row}>
        <div style={styles.card}>
          <h3>Subscription Overview</h3>

          <div style={styles.grid2}>
            <div style={styles.subCard}>
              <h2>1,120</h2>
              <p>Active Subscriptions</p>
            </div>
            <div style={styles.subCard}>
              <h2>340</h2>
              <p>Expired</p>
            </div>
            <div style={styles.subCard}>
              <h2>58</h2>
              <p>New (Last 7 Days)</p>
            </div>
            <div style={styles.subCard}>
              <h2>24</h2>
              <p>Chat Blocked</p>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3>Recent Activity</h3>
          {activity.map((item, i) => (
            <div key={i} style={styles.activity}>
              <strong>{item.title}</strong>
              <p style={styles.small}>{item.desc}</p>
              <span style={styles.small}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>RoboSkillX Admin Panel</div>
    </div>
  );
}

export default AdminDashboard;

/* ================= DATA ================= */
const stats = [
  { title: "Total Learners", value: "2,845", sub: "+12% from last month" },
  { title: "Active Subs", value: "1,120", sub: "42 expiring soon" },
  { title: "Active Mentors", value: "84", sub: "Currently online: 12" },
  { title: "Pending Mentors", value: "15", sub: "Requires review" },
  { title: "Today's Sessions", value: "38", sub: "5 currently active" },
  { title: "Withdrawals", value: "8", sub: "Pending approval" },
];

const chartData = [
  { month: "Jan", revenue: 6500 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 10000 },
  { month: "Apr", revenue: 7500 },
  { month: "May", revenue: 8000 },
  { month: "Jun", revenue: 7700 },
  { month: "Jul", revenue: 7900 },
];

const sessions = [
  {
    learner: "Alex Johnson",
    mentor: "Dr. Sarah Smith",
    course: "Intro to Robotics - Mod 2",
    time: "10:00 AM",
    status: "Assigned",
    action: "View Session",
  },
  {
    learner: "Maria Garcia",
    mentor: "Eng. James Chen",
    course: "Advanced Sensors",
    time: "11:30 AM",
    status: "Pending",
    action: "Assign Mentor",
  },
];

const actions = [
  { title: "Mentor Approvals", sub: "15 new applications" },
  { title: "Unassigned Sessions", sub: "4 sessions pending" },
  { title: "Withdrawals", sub: "8 requests pending" },
  { title: "Support Chats", sub: "3 unresolved tickets" },
];

const activity = [
  {
    title: "Mentor Approved",
    desc: "Dr. Emily Roberts approved as Advanced Robotics mentor",
    time: "2 hours ago",
  },
  {
    title: "Session Assigned",
    desc: "Python for Robotics session assigned to Eng. James Chen",
    time: "3 hours ago",
  },
];

/* ================= STYLES ================= */
const styles = {
  container: {
    background: "#C1D1CF",
    padding: "30px",
    minHeight: "100vh",
    color: "#171F22",
  },

  topCards: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #636467",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    flex: 1,
  },

  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  cardTitle: { fontSize: "14px" },
  cardValue: { margin: "10px 0" },
  cardSub: { fontSize: "13px", color: "#666" },

  badge: {
    background: "#EAEAEA",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
  },

  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  viewBtn: {
    background: "#666B64",
    color: "#fff",
    border: "none",
    padding: "5px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  earningRow: {
    display: "flex",
    gap: "15px",
    margin: "15px 0",
  },

  miniCard: {
    background: "#F3F3F3",
    padding: "15px",
    borderRadius: "6px",
    flex: 1,
  },

table: {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
},

thead: {
  borderBottom: "2px solid #636467",
},

th: {
  textAlign: "left",
  padding: "14px 12px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#171F22",
},

td: {
  padding: "18px 12px",
  fontSize: "15px",
},

cardHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
},

viewAllBtn: {
  background: "#FFFFFF",
  border: "1px solid #636467",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
},

actionBtn: {
  background: "#F8F8F8",
  border: "1px solid #DDD",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
},

statusBadge: (status) => ({
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "500",
  border: "1px solid #636467",
  background:
    status === "Assigned"
      ? "#D6EAF8"
      : status === "Pending"
      ? "#E6F25C"
      : status === "Completed"
      ? "#C8E6C9"
      : "#F5C6CB",
}),

  status: (type) => ({
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    background:
      type === "Assigned"
        ? "#D6EAF8"
        : type === "Pending"
        ? "#FCF3CF"
        : "#E8F8F5",
  }),

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "15px",
  },

  subCard: {
    background: "#F3F3F3",
    padding: "20px",
    borderRadius: "6px",
    textAlign: "center",
  },

  activity: {
    marginTop: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },

  small: { fontSize: "13px", color: "#555" },

  footer: {
    textAlign: "center",
    marginTop: "30px",
    color: "#666B64",
  },
  
};