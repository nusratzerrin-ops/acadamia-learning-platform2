import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/common/header/Header"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import HTMLHome from "./components/home/HTMLHome"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Login from "./components/Login"
import Register from "./components/Register"
import AdminDashboard from "./components/AdminDashboard"
import StudentDashboard from "./components/StudentDashboard"
import TeacherDashboard from "./components/TeacherDashboard"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/student" component={StudentDashboard} />
        <Route exact path="/teacher" component={TeacherDashboard} />
        <Route render={() => (
          <>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/mainhome" component={HTMLHome} />
              <Route exact path="/about" component={About} />
              <Route exact path="/courses" component={CourseHome} />
              <Route exact path="/allcourses" component={CourseHome} />
              <Route exact path="/team" component={Team} />
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/journal" component={Blog} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
            <Footer />
          </>
        )} />
      </Switch>
    </Router>
  )
}
export default App