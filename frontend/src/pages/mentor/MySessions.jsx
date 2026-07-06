import { useEffect, useState } from "react";
import api from "../../services/axios";

function MySessions() {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await api.get(
        "mentors/my-sessions/"
      );

      setSessions(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h2>My Sessions</h2>

      {sessions.map((session) => (

        <div
          key={session.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
          }}
        >
          <h3>{session.title}</h3>

          <p>{session.description}</p>

          <p>
            Course:
            {session.course_name}
          </p>

        </div>
      ))}

    </div>
  );
}

export default MySessions;