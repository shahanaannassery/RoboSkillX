import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft, FiSave, FiVideo, FiFileText, FiZap,
  FiBookOpen, FiClock, FiTool, FiUpload, FiX, FiCheck,
} from "react-icons/fi";

const API_URL = "http://localhost:8000";

function EditSession() {
  const { id } = useParams();
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  course: "",
  title: "",
  description: "",
  duration: "",
  project_title: "",
  project_description: "",
});

  const [videoFile, setVideoFile] = useState(null);
  const [materialsFile, setMaterialsFile] = useState(null);
  const [circuitFile, setCircuitFile] = useState(null);

  const [existingVideo, setExistingVideo] = useState(null);
  const [existingMaterials, setExistingMaterials] = useState(null);
  const [existingCircuit, setExistingCircuit] = useState(null);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const videoRef = useRef();
  const materialsRef = useRef();
  const circuitRef = useRef();

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line
  }, []);

  const loadSession = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sessions/${id}/`);
      const d = res.data;
      setFormData({
  course: d.course,
  title: d.title || "",
  description: d.description || "",
  duration: d.duration || "",
  project_title: d.project_title || "",
  project_description: d.project_description || "",
});
      setExistingVideo(d.video || null);
      setExistingMaterials(d.materials || null);
      setExistingCircuit(d.circuit_diagram || null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (videoFile) data.append("video", videoFile);
      if (materialsFile) data.append("materials", materialsFile);
      if (circuitFile) data.append("circuit_diagram", circuitFile);

       console.log("FORM DATA =", formData);

      await axios.put(`${API_URL}/api/admin/sessions/${id}/update/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("Session updated successfully!");
      setTimeout(() => navigate("/admin/sessions"), 1500);
    } catch (err) {
      console.log(err);
      alert("Failed to update session");
    } finally {
      setSaving(false);
    }
  };

  /* ── Reusable upload row ── */
  // eslint-disable-next-line no-unused-vars
  const UploadRow = ({ label, icon: Icon, accept, fileState, setFileState, existing, inputRef, hint }) => (
    <div style={s.uploadRow}>
      <div style={s.uploadLeft}>
        <div style={s.uploadIcon}><Icon size={16} color="#5b9e94" /></div>
        <div>
          <p style={s.uploadLabel}>{label}</p>
          <p style={s.uploadHint}>{hint}</p>
        </div>
      </div>

      <div style={s.uploadRight}>
        {/* Status chip */}
        {fileState ? (
          <div style={s.chipNew}>
            <FiCheck size={12} color="#1e6b56" />
            <span style={s.chipText}>{fileState.name}</span>
            <button type="button" style={s.chipRemove} onClick={() => setFileState(null)}>
              <FiX size={12} />
            </button>
          </div>
        ) : existing ? (
          <div style={s.chipExisting}>
            <span style={s.dot} />
            <span style={s.chipText}>File saved</span>
            <a href={`${API_URL}${existing}`} target="_blank" rel="noreferrer" style={s.viewLink}>
              View
            </a>
          </div>
        ) : (
          <div style={s.chipEmpty}>No file</div>
        )}

        {/* Upload button */}
        <button type="button" style={s.uploadBtn} onClick={() => inputRef.current.click()}>
          <FiUpload size={13} />
          {existing && !fileState ? "Replace" : "Upload"}
        </button>
        <input
          type="file"
          accept={accept}
          ref={inputRef}
          style={{ display: "none" }}
          onChange={(e) => setFileState(e.target.files[0] || null)}
        />
      </div>
    </div>
  );

  return (
    <div style={s.wrapper}>

      {/* TOP BAR */}
      <div style={s.topBar}>
        <div>
          <h1 style={s.heading}>Edit Session</h1>
          <p style={s.subHeading}>Update session content, resources and project details</p>
        </div>
        <button type="button" style={s.backBtn} onClick={() => navigate("/admin/sessions")}>
          <FiArrowLeft size={14} /> Back to sessions
        </button>
      </div>

      <form onSubmit={handleUpdate}>

        {/* ── SESSION INFO ── */}
        <div style={s.card}>
          <div style={s.cardHead}>
            <FiBookOpen size={15} color="#5b9e94" />
            <span style={s.cardTitle}>Session Info</span>
          </div>

          <div style={s.row2}>
            <div style={s.fg}>
              <label style={s.label}>Session Title</label>
              <input
                type="text" name="title" value={formData.title}
                onChange={handleChange} style={s.input}
                placeholder="Enter session title" required
              />
            </div>
            <div style={s.fg}>
              <label style={s.label}>
                <FiClock size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />
                Duration
              </label>
              <input
                type="text" name="duration" value={formData.duration}
                onChange={handleChange} style={s.input}
                placeholder="e.g. 45 minutes"
              />
            </div>
          </div>

          <div style={s.fg}>
            <label style={s.label}>Description</label>
            <textarea
              name="description" value={formData.description}
              onChange={handleChange} style={s.textarea}
              placeholder="Describe what this session covers..."
            />
          </div>
        </div>

        {/* ── PROJECT ── */}
        <div style={s.card}>
          <div style={s.cardHead}>
            <FiTool size={15} color="#5b9e94" />
            <span style={s.cardTitle}>Project</span>
          </div>

          <div style={s.fg}>
            <label style={s.label}>Project Title</label>
            <input
              type="text" name="project_title" value={formData.project_title}
              onChange={handleChange} style={s.input}
              placeholder="e.g. Line Follower Robot"
            />
          </div>

          <div style={{ ...s.fg, marginBottom: 0 }}>
            <label style={s.label}>Project Description</label>
            <textarea
              name="project_description" value={formData.project_description}
              onChange={handleChange} style={s.textarea}
              placeholder="Describe the project students will build..."
            />
          </div>
        </div>

        {/* ── MEDIA & RESOURCES ── */}
        <div style={s.card}>
          <div style={s.cardHead}>
            <FiUpload size={15} color="#5b9e94" />
            <span style={s.cardTitle}>Media & Resources</span>
          </div>

          <UploadRow
            label="Session Video" icon={FiVideo} accept="video/*"
            fileState={videoFile} setFileState={setVideoFile}
            existing={existingVideo} inputRef={videoRef}
            hint="MP4, MOV, AVI"
          />
          <div style={s.divider} />
          <UploadRow
            label="Notes / Materials" icon={FiFileText} accept=".pdf,.doc,.docx"
            fileState={materialsFile} setFileState={setMaterialsFile}
            existing={existingMaterials} inputRef={materialsRef}
            hint="PDF or Word document"
          />
          <div style={s.divider} />
          <UploadRow
            label="Circuit Diagram" icon={FiZap} accept="image/*,.pdf"
            fileState={circuitFile} setFileState={setCircuitFile}
            existing={existingCircuit} inputRef={circuitRef}
            hint="PNG, JPG, or PDF"
          />
        </div>

        {/* ── FOOTER ── */}
        <div style={s.footer}>
          {successMsg && (
            <div style={s.successBanner}>
              <FiCheck size={14} /> {successMsg}
            </div>
          )}
          <div style={s.footerBtns}>
            <button type="button" style={s.cancelBtn} onClick={() => navigate("/admin/sessions")}>
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }}
              disabled={saving}
            >
              <FiSave size={14} />
              {saving ? "Saving..." : "Update Session"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default EditSession;

/* ===== STYLES ===== */
const s = {
  wrapper: {
    padding: "36px 32px",
    background: "#C1D1CF",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: "860px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#171F22",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },

  subHeading: {
    color: "#4a5e62",
    fontSize: "14px",
    margin: 0,
  },

  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "10px 16px",
    border: "1.5px solid #a8bfbd",
    borderRadius: "9px",
    background: "#fff",
    color: "#3a5055",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },

  /* Card */
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "24px",
    border: "1px solid #d0dedd",
    boxShadow: "0 2px 10px rgba(23,31,34,0.06)",
    marginBottom: "16px",
  },

  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingBottom: "16px",
    marginBottom: "20px",
    borderBottom: "1px solid #eef3f2",
  },

  cardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#2e5a60",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  /* Form helpers */
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  fg: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "600",
    fontSize: "13px",
    color: "#3a5055",
  },

  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #d0dedd",
    fontSize: "14px",
    outline: "none",
    color: "#171F22",
    background: "#f8fbfb",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #d0dedd",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    color: "#171F22",
    background: "#f8fbfb",
    boxSizing: "border-box",
    lineHeight: "1.6",
    fontFamily: "inherit",
  },

  /* Upload row */
  uploadRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "4px 0",
  },

  uploadLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },

  uploadIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "9px",
    background: "#eef8f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  uploadLabel: {
    margin: "0 0 2px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#171F22",
  },

  uploadHint: {
    margin: 0,
    fontSize: "12px",
    color: "#8fa8a6",
  },

  uploadRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },

  /* Status chips */
  chipNew: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 10px",
    background: "#e4f4f0",
    border: "1px solid #a7e0d3",
    borderRadius: "7px",
    maxWidth: "180px",
  },

  chipExisting: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 10px",
    background: "#eef8f5",
    border: "1px solid #c5e8df",
    borderRadius: "7px",
  },

  chipEmpty: {
    padding: "5px 10px",
    background: "#f3f5f5",
    border: "1px solid #dde5e4",
    borderRadius: "7px",
    fontSize: "12px",
    color: "#8fa8a6",
    fontWeight: "500",
  },

  chipText: {
    fontSize: "12px",
    color: "#1e6b56",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "120px",
  },

  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#2e9e7a",
    flexShrink: 0,
  },

  viewLink: {
    fontSize: "12px",
    color: "#5b9e94",
    fontWeight: "700",
    textDecoration: "none",
  },

  chipRemove: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#6b8a8e",
    display: "flex",
    alignItems: "center",
    padding: 0,
    flexShrink: 0,
  },

  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    border: "1.5px solid #a8bfbd",
    borderRadius: "8px",
    background: "#eef3f2",
    color: "#3a5055",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  divider: {
    height: "1px",
    background: "#eef3f2",
    margin: "16px 0",
  },

  /* Footer */
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px",
    padding: "18px 22px",
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #d0dedd",
    boxShadow: "0 2px 10px rgba(23,31,34,0.06)",
    flexWrap: "wrap",
  },

  footerBtns: {
    display: "flex",
    gap: "10px",
  },

  cancelBtn: {
    padding: "11px 22px",
    border: "1.5px solid #a8bfbd",
    borderRadius: "9px",
    background: "transparent",
    color: "#3a5055",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },

  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 24px",
    border: "none",
    borderRadius: "9px",
    background: "#171F22",
    color: "#C1D1CF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },

  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    background: "#d4ede8",
    color: "#1e6b56",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
  },
};