import React, { useState, useEffect } from "react";
import { getCourses, addCourse, deleteCourse } from "../api";

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({ title: "", description: "", price: "", instructor: "", classTime: "" });

    useEffect(() => { loadCourses(); }, []);

    const loadCourses = async () => {
        try {
            const res = await getCourses();
            setCourses(res.data);
        } catch (err) { console.log(err); }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            await addCourse(form);
            setMessage("Course added! ✅");
            setForm({ title: "", description: "", price: "", instructor: "", classTime: "" });
            loadCourses();
            setTimeout(() => { setMessage(""); setActiveTab("courses"); }, 1500);
        } catch (err) {
            setMessage("Something went wrong! ❌");
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteCourse(id);
            loadCourses();
        }
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
        adminBadge: { background: "#1eb2a6", color: "white", padding: "6px 15px", borderRadius: "20px", fontSize: "13px" },
        logoutBtn: { background: "#fff", color: "#1eb2a6", border: "2px solid #1eb2a6", padding: "6px 15px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", fontWeight: "600", margin: 0, boxShadow: "none" },
        content: { padding: "25px", flex: 1 },
        pageTitle: { fontSize: "26px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "5px" },
        pageSubtitle: { color: "#888", marginBottom: "25px", fontSize: "14px" },
        statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" },
        statCard: (color) => ({ background: color, color: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }),
        statNumber: { fontSize: "36px", fontWeight: "bold", marginBottom: "5px" },
        statLabel: { fontSize: "14px", opacity: 0.9 },
        card: { background: "white", borderRadius: "12px", padding: "25px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: "25px" },
        cardTitle: { fontSize: "18px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid #f0f2f5" },
        input: { display: "block", width: "100%", padding: "12px 15px", margin: "10px 0", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "14px", boxSizing: "border-box", outline: "none" },
        submitBtn: { padding: "12px 30px", background: "#1eb2a6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", fontWeight: "bold", marginRight: "10px", boxShadow: "none" },
        table: { width: "100%", borderCollapse: "collapse" },
        th: { padding: "12px 15px", textAlign: "left", background: "#f8f9fa", color: "#666", fontSize: "13px", fontWeight: "600" },
        td: { padding: "12px 15px", borderBottom: "1px solid #f0f2f5", fontSize: "14px", color: "#333" },
        classTimeBadge: { background: "#e8f8f7", color: "#1eb2a6", padding: "3px 10px", borderRadius: "12px", fontSize: "13px", fontWeight: "500", display: "inline-block" },
        deleteBtn: { background: "#ff4757", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", margin: 0, boxShadow: "none" },
        alert: { padding: "12px 20px", borderRadius: "8px", marginBottom: "20px", background: "#1eb2a620", color: "#1eb2a6", fontWeight: "600", border: "1px solid #1eb2a6" },
        grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
        courseCard: { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderTop: "4px solid #1eb2a6" },
        courseTitle: { fontSize: "18px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "10px" },
        courseDesc: { color: "#666", fontSize: "14px", marginBottom: "15px", lineHeight: "1.6" },
        courseInfo: { color: "#333", fontSize: "14px", marginBottom: "8px" },
        price: { fontSize: "22px", fontWeight: "bold", color: "#1eb2a6", marginBottom: "15px" },
        enrollBtn: { background: "#1eb2a6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", width: "100%", fontSize: "15px", margin: 0, boxShadow: "none" },
        roleBanner: (color) => ({ background: color, color: "#fff", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", marginBottom: "20px", display: "inline-block" }),
    };

    const renderDashboard = () => (
        <>
            <div style={styles.statsGrid}>
                <div style={styles.statCard("#1eb2a6")}>
                    <div style={styles.statNumber}>{courses.length}</div>
                    <div style={styles.statLabel}>📚 Total Courses</div>
                </div>
                <div style={styles.statCard("#0f8a80")}>
                    <div style={styles.statNumber}>0</div>
                    <div style={styles.statLabel}>👨‍🏫 Total Teachers</div>
                </div>
                <div style={styles.statCard("#0d6e65")}>
                    <div style={styles.statNumber}>0</div>
                    <div style={styles.statLabel}>👨‍🎓 Total Students</div>
                </div>
                <div style={styles.statCard("#084f49")}>
                    <div style={styles.statNumber}>0</div>
                    <div style={styles.statLabel}>👥 Total Users</div>
                </div>
            </div>
            <div style={styles.card}>
                <div style={styles.cardTitle}>📚 Recent Courses</div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Instructor</th>
                            <th style={styles.th}>Class Time</th>
                            <th style={styles.th}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.slice(0, 5).map(c => (
                            <tr key={c._id}>
                                <td style={styles.td}>{c.title}</td>
                                <td style={styles.td}>{c.instructor}</td>
                                <td style={styles.td}>
                                    {c.classTime
                                        ? <span style={styles.classTimeBadge}>🕐 {c.classTime}</span>
                                        : <span style={{ color: "#bbb" }}>—</span>}
                                </td>
                                <td style={styles.td}>${c.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderAddCourse = () => (
        <div style={styles.card}>
            <div style={styles.roleBanner("#0f8a80")}>👨‍🏫 Viewing as: Teacher — Add Course</div>
            <div style={styles.cardTitle}>➕ Add New Course</div>
            {message && <div style={styles.alert}>{message}</div>}
            <form onSubmit={handleAddCourse}>
                <input style={styles.input} type="text" placeholder="Course Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <input style={styles.input} type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                <input style={styles.input} type="number" placeholder="Price ($)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                <input style={styles.input} type="text" placeholder="Instructor Name" value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} required />
                <input style={styles.input} type="text" placeholder="Class Time (e.g. Mon & Wed 10:00 AM)" value={form.classTime} onChange={e => setForm({ ...form, classTime: e.target.value })} />
                <div style={{ marginTop: "15px" }}>
                    <button type="submit" style={styles.submitBtn}>Add Course</button>
                </div>
            </form>
        </div>
    );

    const renderTeacherView = () => (
        <div style={styles.card}>
            <div style={styles.roleBanner("#0f8a80")}>👨‍🏫 Viewing as: Teacher — Course Management</div>
            <div style={styles.cardTitle}>📚 All Courses</div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Instructor</th>
                        <th style={styles.th}>Class Time</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(c => (
                        <tr key={c._id}>
                            <td style={styles.td}>{c.title}</td>
                            <td style={styles.td}>{c.instructor}</td>
                            <td style={styles.td}>
                                {c.classTime
                                    ? <span style={styles.classTimeBadge}>🕐 {c.classTime}</span>
                                    : <span style={{ color: "#bbb" }}>—</span>}
                            </td>
                            <td style={styles.td}>${c.price}</td>
                            <td style={styles.td}>
                                <button style={styles.deleteBtn} onClick={() => handleDeleteCourse(c._id)}>🗑 Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderStudentView = () => (
        <>
            <div style={styles.roleBanner("#1eb2a6")}>👨‍🎓 Viewing as: Student — Browse Courses</div>
            <div style={styles.grid}>
                {courses.map((course) => (
                    <div key={course._id} style={styles.courseCard}>
                        <div style={styles.courseTitle}>{course.title}</div>
                        <p style={styles.courseDesc}>{course.description}</p>
                        <div style={styles.courseInfo}>👨‍🏫 {course.instructor}</div>
                        {course.classTime && <div style={styles.courseInfo}>🕐 {course.classTime}</div>}
                        <div style={styles.price}>${course.price}</div>
                        <button style={styles.enrollBtn}>Enroll Now</button>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div style={styles.wrapper}>
            <div style={styles.sidebar}>
                <div style={styles.sidebarInner}>
                    <div style={styles.logo}>🎓 Science E-Learning</div>

                    <div style={styles.navSection}>MAIN</div>
                    <div style={styles.navItem(activeTab === "dashboard")} onClick={() => setActiveTab("dashboard")}>
                        📊 Dashboard
                    </div>

                    <div style={styles.navSection}>TEACHER VIEW</div>
                    <div style={styles.navItem(activeTab === "addcourse")} onClick={() => { setActiveTab("addcourse"); setMessage(""); setForm({ title: "", description: "", price: "", instructor: "", classTime: "" }); }}>
                        ➕ Add Course
                    </div>
                    <div style={styles.navItem(activeTab === "courses")} onClick={() => setActiveTab("courses")}>
                        📚 Manage Courses
                    </div>

                    <div style={styles.navSection}>STUDENT VIEW</div>
                    <div style={styles.navItem(activeTab === "browse")} onClick={() => setActiveTab("browse")}>
                        🔍 Browse Courses
                    </div>
                </div>
            </div>

            <div style={styles.main}>
                <div style={styles.topbar}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
                        <span style={{ fontWeight: "bold", color: "#1eb2a6" }}>Admin Panel</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span style={styles.adminBadge}>👑 Admin</span>
                        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
                    </div>
                </div>

                <div style={styles.content}>
                    <div style={styles.pageTitle}>
                        {activeTab === "dashboard" && "Dashboard Overview"}
                        {activeTab === "addcourse" && "Teacher View — Add Course"}
                        {activeTab === "courses" && "Teacher View — Course Management"}
                        {activeTab === "browse" && "Student View — Browse Courses"}
                    </div>
                    <div style={styles.pageSubtitle}>Science E-Learning Management System</div>

                    {activeTab === "dashboard" && renderDashboard()}
                    {activeTab === "addcourse" && renderAddCourse()}
                    {activeTab === "courses" && renderTeacherView()}
                    {activeTab === "browse" && renderStudentView()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
