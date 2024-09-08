import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notificationpage from "./pages/Notificationpage";
import Navbar1 from "./components/Navbar1";
import Coverpage from "./pages/Coverpage";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctor from "./pages/admin/Doctor";
import User from "./pages/admin/User";
import Profile from "./pages/doctor/Profile";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";
import Profile1 from "./pages/Profile";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import Test from "./pages/test";
import Services from "./pages/Services";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Verifications from "./pages/Verifications";
import AuthLink from "./pages/AuthLink";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Coverpage />
              </PublicRoutes>
            }
          ></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
        <Routes>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        {/* <Routes>
          <Route
            path="/contact"
            element={
              <PublicRoutes>
                <Contact />
              </PublicRoutes>
            }
          ></Route>
        </Routes> */}
        <Routes>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        {/* <Routes>
          <Route
            path="/contact"
            element={
              <PublicRoutes>
                <Contact />
              </PublicRoutes>
            }
          ></Route>
        </Routes> */}
        <Routes>
          <Route
            path="/forgetPassword"
            element={
              <PublicRoutes>
                <ForgetPassword />
              </PublicRoutes>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/reset-password/:token"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/verification/:token"
            element={
              <PublicRoutes>
                <Verifications />
              </PublicRoutes>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/authLink"
            element={
              <PublicRoutes>
                <AuthLink />
              </PublicRoutes>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Coverpage />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile1 />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/services"
            element={
              <ProtectedRoutes>
                <Services />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/home1"
              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/applydoctor"
              element={
                <ProtectedRoutes>
                  <ApplyDoctor />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <Notificationpage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/User"
              element={
                <ProtectedRoutes>
                  <User />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/admin/Doctors"
              element={
                <ProtectedRoutes>
                  <Doctor />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/Profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/booking/:doctorId"
              element={
                <ProtectedRoutes>
                  <Booking />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoutes>
                  <DoctorAppointment />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
