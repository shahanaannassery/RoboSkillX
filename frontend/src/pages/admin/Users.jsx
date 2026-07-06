import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { FaSearch } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/admin/users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      
      {/* HEADER */}
      <div style={styles.topBar}>
        <h1 style={styles.title}>Users</h1>

        <div style={styles.searchBox}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>
                  <div style={styles.userCell}>
                    <div style={styles.avatar}>
                      {user.full_name?.charAt(0)}
                    </div>

                    <div>
                      <div style={styles.name}>
                        {user.full_name}
                      </div>

                      <div style={styles.id}>
                        #{user.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td style={styles.td}>
                  {user.email}
                </td>

                <td style={styles.td}>
                  <span style={styles.roleBadge}>
                    {user.role}
                  </span>
                </td>

                <td style={styles.td}>
                  <span style={styles.activeBadge}>
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Users;

const styles = {

  wrapper: {
    padding: "30px",
    background: "#C1D1CF",
    minHeight: "100vh",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "40px",
    fontWeight: "700",
    color: "#171F22",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    padding: "12px 16px",
    borderRadius: "10px",
    width: "320px",
    border: "1px solid #ddd",
  },

  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    background: "transparent",
  },

  tableContainer: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "18px",
    background: "#F4F7F7",
    fontWeight: "600",
    borderBottom: "1px solid #E5E7EB",
  },

  td: {
    padding: "18px",
    borderBottom: "1px solid #F1F1F1",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#171F22",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },

  name: {
    fontWeight: "600",
    color: "#171F22",
  },

  id: {
    fontSize: "12px",
    color: "#777",
  },

  roleBadge: {
    background: "#E0E7FF",
    color: "#4338CA",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  activeBadge: {
    background: "#DCFCE7",
    color: "#15803D",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
};