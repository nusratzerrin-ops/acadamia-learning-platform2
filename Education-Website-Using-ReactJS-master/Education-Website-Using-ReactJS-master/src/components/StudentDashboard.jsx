import React, { useEffect, useState } from "react";
import { getCourses } from "../api";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (error) { console.log(error); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const styles = {
    wrapper: { display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f0f2f5" },
    sidebar: { width: sidebarOpen ? "250px" : "0px", background: "#1eb2a6", color: "white", transition: "width 0.3s", overflow: "hidden", flexShrink: 0 },
    sidebarInner: { width: "250px", padding: "20px 0" },
    logo: { padding: "20px 25px 30px", fontSize: "20px", fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.2)", color: "#fff" },
    navSection: { padding: "15px 25px 5px", fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" },
    navItem: (active) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "12px 25px", cursor: "pointer", background: active ? "rgba(255,255,255,0.2)" : "transparent", color: "#fff", borderLeft: active ? "3px solid #fff" : "3px solid transparent", transition: "all 0.2s" }),
    main: { flex: 1, display: "flex", flexDirection: "column" },
    topbar: { background: "white", padding: "15px 25px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 5px rgba(0,0,0,0.08)" },
    menuBtn: { background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#333", margin: 0, padding: 0, boxShadow: "none" },
    badge: { background: "#1eb2a6", color: "white", padding: "6px 15px", borderRadius: "20px", fontSize: "13px" },
    logoutBtn: { background: "#fff", color: "#1eb2a6", border: "2px solid #1eb2a6", padding: "6px 15px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", fontWeight: "600", margin: 0, boxShadow: "none" },
    content: { padding: "25px", flex: 1 },
    pageTitle: { fontSize: "26px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "5px" },
    pageSubtitle: { color: "#888", marginBottom: "25px", fontSize: "14px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
    courseCard: { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: "4px solid #1eb2a6" },
    courseTitle: { fontSize: "18px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "10px" },
    courseDesc: { color: "#666", fontSize: "14px", marginBottom: "15px", lineHeight: "1.6" },
    courseInfo: { color: "#333", fontSize: "14px", marginBottom: "8px" },
    price: { fontSize: "22px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "15px" },
    enrollBtn: { background: "#1eb2a6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", width: "100%", fontSize: "15px", margin: 0, boxShadow: "none" },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarInner}>
          <div style={styles.logo}>🎓 Science E-Learning</div>
          <div style={styles.navSection}>MENU</div>
          <div style={styles.navItem(activeTab === "courses")} onClick={() => setActiveTab("courses")}>📚 Browse Courses</div>
          <div style={styles.navItem(activeTab === "enrolled")} onClick={() => setActiveTab("enrolled")}>✅ My Courses</div>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <span style={{ fontWeight: "bold", color: "#1eb2a6" }}>Student Dashboard</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={styles.badge}>👨‍🎓 Student</span>
            <button style={styles.logoutBtn} onClick={logout}>Logout</button>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.pageTitle}>Browse Courses</div>
          <div style={styles.pageSubtitle}>Find the perfect course for you</div>

          <div style={styles.grid}>
            {courses.map((course) => (
              <div key={course._id} style={styles.courseCard}>
                <div style={styles.courseTitle}>{course.title}</div>
                <p style={styles.courseDesc}>{course.description}</p>
                <div style={styles.courseInfo}>👨‍🏫 {course.instructor}</div>
                <div style={styles.price}>${course.price}</div>
                <button style={styles.enrollBtn}>Enroll Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;