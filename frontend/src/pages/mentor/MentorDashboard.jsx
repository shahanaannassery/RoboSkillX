import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/axios";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiTrendingUp,
  FiPlayCircle,
} from "react-icons/fi";

function MentorDashboard() {
  const navigate = useNavigate();

  const [mentorName, setMentorName] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_sessions: 24,
    upcoming_sessions: 5,
    completed_sessions: 19,
    pending_requests: 3,
    total_earnings: 12450,
    wallet_balance: 3200,
    monthly_earnings: 4800,
    last_payout: 2000,
  });

  const [sessions] = useState([
    {
      id: 1,
      learner: "Sarah Lee",
      course: "Robotics Level 2: Sensors",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
    },
    {
      id: 2,
      learner: "Michael Johnson",
      course: "Python Programming: Advanced",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
    },
  ]);

  const [activities] = useState([
    {
      title: "Mentor profile approved",
      time: "2 hours ago",
    },
    {
      title: "New session assigned",
      time: "5 hours ago",
    },
    {
      title: "Positive feedback received",
      time: "1 day ago",
    },
  ]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statusRes = await api.get("mentors/my-status/");

        if (statusRes.data.status !== "approved") {
          navigate("/mentor/review-status");
          return;
        }

        const userName = localStorage.getItem("user_name");
        setMentorName(userName || "Mentor");

        setLoading(false);
      } catch (error) {
        navigate("/mentor/login");
      }
    };

    loadDashboard();
  }, [navigate]);

  if (loading) {
  return (
    <div style={styles.loading}>
      Loading Dashboard...
    </div>
  );
}

  return (
    <>
      <div style={styles.wrapper}>

        {/* Welcome */}
        <div style={styles.welcomeCard}>
          <h2 style={styles.title}>
            Welcome Back, {mentorName} 👋
          </h2>

          <p style={styles.subtitle}>
            Manage your sessions, track learner progress and monitor earnings.
          </p>
        </div>

        {/* Stats Row 1 */}
        <div style={styles.grid}>
          <StatCard
            icon={<FiCalendar />}
            title="Assigned Sessions"
            value={stats.total_sessions}
          />

          <StatCard
            icon={<FiClock />}
            title="Upcoming Sessions"
            value={stats.upcoming_sessions}
          />

          <StatCard
            icon={<FiCheckCircle />}
            title="Completed Sessions"
            value={stats.completed_sessions}
          />

          <StatCard
            icon={<FiUsers />}
            title="Pending Requests"
            value={stats.pending_requests}
          />
        </div>

        {/* Stats Row 2 */}
        <div style={styles.grid}>
          <StatCard
            icon={<FiDollarSign />}
            title="Total Earnings"
            value={`₹${stats.total_earnings}`}
          />

          <StatCard
            icon={<FiCreditCard />}
            title="Wallet Balance"
            value={`₹${stats.wallet_balance}`}
          />

          <StatCard
            icon={<FiTrendingUp />}
            title="This Month"
            value={`₹${stats.monthly_earnings}`}
          />

          <StatCard
            icon={<FiDollarSign />}
            title="Last Payout"
            value={`₹${stats.last_payout}`}
          />
        </div>

        {/* Quick Actions */}
        <h3 style={styles.sectionTitle}>Quick Actions</h3>

        <div style={styles.quickGrid}>
          <QuickButton
            title="Session Requests"
            path="/mentor/session-requests"
          />

          <QuickButton
            title="My Sessions"
            path="/mentor/my-sessions"
          />

          <QuickButton
            title="Student Progress"
            path="/mentor/student-progress"
          />

          <QuickButton
            title="Courses"
            path="/mentor/courses"
          />

          <QuickButton
            title="Wallet"
            path="/mentor/wallet"
          />
        </div>

        {/* Upcoming Sessions */}
        <div style={styles.contentGrid}>

          <div>
            <h3 style={styles.sectionTitle}>Upcoming Sessions</h3>

            {sessions.map((session) => (
              <div key={session.id} style={styles.sessionCard}>
                <h4>{session.learner}</h4>

                <p>{session.course}</p>

                <p>
                  {session.date} • {session.time}
                </p>

                <div style={styles.btnRow}>
                  <button style={styles.primaryBtn}>
                    Join Session
                  </button>

                  <button style={styles.secondaryBtn}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Activity */}
          <div>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>

            <div style={styles.activityCard}>
              {activities.map((activity, index) => (
                <div key={index} style={styles.activityItem}>
                  <FiPlayCircle color="#26658C" />

                  <div>
                    <p style={{ fontWeight: 600 }}>
                      {activity.title}
                    </p>

                    <small>{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
   </>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>

      <p style={styles.cardTitle}>{title}</p>

      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

function QuickButton({ title, path }) {
  const navigate = useNavigate();

  return (
    <button
      style={styles.quickBtn}
      onClick={() => navigate(path)}
    >
      {title}
    </button>
  );
}

export default MentorDashboard;

const styles = {
wrapper: {
  width: "100%",
  padding: "0",
},

  loading: {
    padding: "50px",
    textAlign: "center",
  },

  welcomeCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
  },

  title: {
    color: "#011C40",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#023859",
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "16px",
  marginBottom: "20px",
},

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #54ACBF",
  },

  icon: {
    fontSize: "22px",
    color: "#26658C",
  },

  cardTitle: {
    color: "#023859",
    marginTop: "10px",
  },

  cardValue: {
    color: "#011C40",
  },

  sectionTitle: {
    color: "#011C40",
    marginBottom: "15px",
  },

 quickGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "12px",
  marginBottom: "25px",
},

  quickBtn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

contentGrid: {
  display: "grid",
  gridTemplateColumns: "1.8fr 1fr",
  gap: "24px",
  marginTop: "20px",
},

  sessionCard: {
  background: "#fff",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #54ACBF",
  boxShadow: "0 2px 8px rgba(38,101,140,0.08)",
  marginBottom: "20px",
},

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  primaryBtn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
  },

  secondaryBtn: {
    background: "#fff",
    color: "#26658C",
    border: "1px solid #26658C",
    padding: "10px 16px",
    borderRadius: "8px",
  },

 activityCard: {
  background: "#fff",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid #54ACBF",
  boxShadow: "0 2px 8px rgba(38,101,140,0.08)",
  minHeight: "250px",
},

  activityItem: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
};