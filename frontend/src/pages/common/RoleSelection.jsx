import { useNavigate } from "react-router-dom";
import miniProject from "../../assets/images/mini project.webp";



function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🤖</div>
          <span style={styles.logoText}>RoboSkillX</span>
        </div>

        <div style={styles.navRight}>
          <span style={styles.accountText}>Already have an account?</span>
          <button style={styles.signIn} onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
          alt="robot learning"
          style={styles.heroImage}
        />

        <h1 style={styles.heroTitle}>
          Learn Robotics, AI & Electronics Through Real Projects
        </h1>

        <p style={styles.heroSub}>
          Interactive simulations, expert mentors, real-world projects and
          smart technology learning — all in one platform.
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/learner/register")}
        >
          Start Learning
        </button>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        <div>👦 Age 8-25+</div>
        <div>🎓 400K+ Students</div>
        <div>🌍 65 Countries</div>
        <div>⭐ 4.6 Rating</div>
      </section>

      {/* PROGRAMS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Programs by Age Group</h2>

        <div style={styles.cardGrid}>
          {[
            ["Age under 13", "Fun robotics & creative circuits"],
            ["Age 13-18", "Coding, electronics & problem solving"],
            ["Age 18-25", "Robotics projects"],
            ["Age 25+", "Advanced robotics & AI innovation"],
          ].map((item, i) => (
            <div key={i} style={styles.infoCard}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
                alt="age"
                style={styles.cardImg}
              />
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT PROJECT SHOWCASE */}
<section style={styles.sectionLight}>
  <h2 style={styles.sectionTitle}>Student Robotics Project</h2>

  <div style={styles.projectSingle}>
    <img src={miniProject} alt="Mini robotics project" style={styles.projectImg} />

    <div style={styles.projectText}>
      <h3>Gesture-Controlled Robot Car</h3>
      <p>
        Students design and build real robotics projects using sensors,
        coding logic, and circuit simulation.  
        This hands-on learning helps children understand real-world
        engineering concepts in a fun and creative way.
      </p>
    </div>
  </div>
</section>



      {/* VIDEO SECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>See What Students Built</h2>

        <div style={styles.videoGrid}>
          {[
            "https://www.youtube.com/embed/cgDjWkPXr6g",
             "https://www.youtube.com/embed/s7palU9pigM",
            "https://www.youtube.com/embed/KgeT13efBss",
          ].map((video, i) => (
            <iframe
              key={i}
              src={video}
              title="student video"
              style={styles.video}
              allowFullScreen
            />
          ))}
        </div>
      </section>

 {/* TESTIMONIALS */}
<section style={styles.sectionLight}>
  <h2 style={styles.sectionTitle}>Happy Parents & Mentors</h2>

  <div style={styles.testimonialGrid}>
    {[
      {
        name: "Prof. Rao",
        role: "Mentor",
        text: "Amazing robotics learning experience for kids.",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
      },
      {
        name: "Dr. Amrutha",
        role: "Parent",
        text: "My daughter gained real confidence in science.",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4,
      },
      {
        name: "Mr. Andrew",
        role: "Parent",
        text: "Best platform to introduce technology to children.",
        img: "https://randomuser.me/api/portraits/men/65.jpg",
        rating: 5,
      },
    ].map((t, i) => (
      <div key={i} style={styles.testimonialCard}>
        <img src={t.img} alt={t.role} style={styles.avatar} />

        {/* ROLE BADGE */}
        <div style={styles.roleBadge}>{t.role}</div>

        
        <div style={styles.stars}>
          {"★".repeat(t.rating)}
          {"☆".repeat(5 - t.rating)}
        </div>

        <p style={styles.testimonialText}>"{t.text}"</p>
        <strong style={styles.testimonialName}>{t.name}</strong>
      </div>
    ))}
  </div>
</section>

      
      
     {/* FEATURES */}
<section style={styles.featuresSection}>
  <h2 style={styles.sectionTitle}>Why Choose RoboSkillX?</h2>

  <div style={styles.featuresGrid}>
    {[
      { icon: "🧠", text: "Hands-on Learning" },
      { icon: "🤖", text: "Real Circuit Simulation" },
      { icon: "🎓", text: "Certificates & Badges" },
      { icon: "📚", text: "Project-Based Courses" },
      { icon: "👨‍🏫", text: "Live Mentor Sessions" },
      { icon: "🚀", text: "AI & IoT Innovation" },
    ].map((item, i) => (
      <div key={i} style={styles.featureCard}>
        <div style={styles.featureIcon}>{item.icon}</div>
        <p style={styles.featureText}>{item.text}</p>
      </div>
    ))}
  </div>
</section>

      {/* ROLE SELECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Choose Your Role</h2>

        <div style={styles.roleGrid}>
          <div style={styles.roleCard}>
            <h3>Learner</h3>
            <p>Start robotics learning with guided courses & projects.</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/learner/register")}
            >
              Continue as Learner
            </button>
          </div>

          <div style={styles.roleCard}>
            <h3>Mentor</h3>
            <p>Teach students, conduct sessions and earn income.</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/mentor/register")}
            >
              Continue as Mentor
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 RoboSkillX — Online Robotics Learning Platform
      </footer>
    </div>
  );
}

export default RoleSelection;

const styles = {
  page: { background: "#A7EBF2", fontFamily: "sans-serif" },

  navbar: {
    background: "#8FD6DE",
    padding: "12px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoWrap: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "#26658C",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 22, fontWeight: "bold", color: "#011C40" },

  navRight: { display: "flex", gap: 10, alignItems: "center" },
  accountText: { color: "#023859" },

  signIn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: 10,
    cursor: "pointer",
  },

  hero: { padding: "80px 20px", textAlign: "center" },
  heroImage: { width: 140, marginBottom: 20 },
  heroTitle: { fontSize: 44, color: "#011C40", maxWidth: 800, margin: "auto" },
  heroSub: { color: "#023859", margin: "20px auto", maxWidth: 600 },

  primaryBtn: {
    background: "#26658C",
    color: "#fff",
    border: "none",
    padding: "12px 26px",
    borderRadius: 12,
    cursor: "pointer",
    marginTop: 10,
  },

  stats: {
    background: "#fff",
    margin: "30px auto",
    padding: "16px 28px",
    borderRadius: 40,
    width: "fit-content",
    display: "flex",
    gap: 30,
    fontWeight: "bold",
  },

  section: { padding: "70px 20px", textAlign: "center" },
  sectionLight: { padding: "70px 20px", background: "#E8F7FA", textAlign: "center" },
  sectionTitle: { fontSize: 32, color: "#011C40", marginBottom: 30 },

  cardGrid: { display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" },
  infoCard: { background: "#fff", padding: 24, borderRadius: 18, width: 240 },

  cardImg: { width: 60 },

  imageGrid: { display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" },
 

  videoGrid: { display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" },
  video: { width: 300, height: 180, borderRadius: 12, border: "none" },

  testimonialGrid: { display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" },
  testimonialCard: { background: "#fff", padding: 24, borderRadius: 18, width: 260 },

  avatar: { width: 70, height: 70, borderRadius: "50%", marginBottom: 10 },

  roleGrid: { display: "flex", gap: 30, justifyContent: "center", flexWrap: "wrap" },
  roleCard: { background: "#fff", padding: 28, borderRadius: 20, width: 260 },

  footer: {
    background: "#8FD6DE",
    padding: 14,
    textAlign: "center",
    marginTop: 40,
    color: "#023859",
  },
  
  // cardImg: { width: 60, marginBottom: 10 },

 featuresSection: {
  padding: "90px 20px",
  background: "linear-gradient(180deg, #E8F7FA 0%, #A7EBF2 100%)",
  textAlign: "center",
},

featuresGrid: {
  display: "flex",
  gap: 28,
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: 30,
},

featureCard: {
  background: "#FFFFFF",
  padding: "26px 22px",
  borderRadius: 18,
  width: 220,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
},

featureIcon: {
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#A7EBF2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 26,
  margin: "0 auto 14px",
},

featureText: {
  color: "#011C40",
  fontWeight: "600",
},

  singleProjectCard: {
  background: "#FFFFFF",
  padding: 24,
  borderRadius: 20,
  display: "flex",
  gap: 24,
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  maxWidth: 900,
  margin: "0 auto",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
},


projectTextBox: {
  maxWidth: 420,
  textAlign: "left",
},

projectTitle: {
  color: "#011C40",
  marginBottom: 10,
},

projectDesc: {
  color: "#023859",
  lineHeight: 1.5,
},
stars: {
  color: "#FFD700",
  fontSize: 18,
  marginBottom: 8,
},

testimonialText: {
  color: "#023859",
  fontSize: 14,
  margin: "10px 0",
},

testimonialName: {
  color: "#011C40",
  fontWeight: "bold",
},
projectSingle: {
  display: "flex",
  gap: 30,
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
},

projectImg: {
  width: 320,
  borderRadius: 16,
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
},

projectText: {
  maxWidth: 400,
  textAlign: "left",
  color: "#023859",
},


};
