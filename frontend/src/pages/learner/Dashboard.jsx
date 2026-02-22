import DashboardLayout from "../../components/layout/DashboardLayout";
import miniProject from "../../assets/images/mini project.webp";

function Dashboard() {
  return (
    <DashboardLayout>
      
      <div style={styles.card}>
        <h2>Welcome back 👋</h2>
        <p>Build robotics projects with hands-on learning.</p>
      </div>

      
      <div style={styles.row}>
        {["67% Progress", "8 Courses", "2450 Points", "12 Badges"].map((t) => (
          <div key={t} style={styles.stat}>{t}</div>
        ))}
      </div>

      
      <div style={styles.project}>
        <img src={miniProject} alt="project" style={styles.img} />
        <div>
          <h3>Gesture-Controlled Robot</h3>
          <button style={styles.btn}>Continue</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;

const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  row: { display: "flex", gap: 20, marginBottom: 20 },

  stat: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
  },

  project: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    display: "flex",
    gap: 20,
    alignItems: "center",
  },

  img: { width: 200, borderRadius: 12 },

  btn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer",
  },
};
