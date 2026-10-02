import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  HeartPulse,
  CalendarDays,
  Stethoscope,
  UserRound,
  LogIn,
  LogOut,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import "./index.css";

const API = "http://localhost:8080/api";

/* =========================
   API
========================= */

const getToken = () =>
  localStorage.getItem("careflow_token");

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API + path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "";

    try {
      message = await response.text();
    } catch {}

    throw new Error(
      `HTTP ${response.status}: ${
        message ||
        response.statusText ||
        "Request failed"
      }`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/* =========================
   APP
========================= */

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("careflow_user") ||
          "null"
      );
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("careflow_user") ||
          "null"
      );

      if (!saved) return "home";

      if (saved.role === "DOCTOR") return "dashboard";
      if (saved.role === "ADMIN") return "admin";
      return "doctors";
    } catch {
      return "home";
    }
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] =
    useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await api("/doctors");

      setDoctors(
        Array.isArray(data) ? data : []
      );
    } catch {
      setDoctors([]);
    }
  };

  const login = async (email, password) => {
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    localStorage.setItem(
      "careflow_token",
      data.token
    );

    localStorage.setItem(
      "careflow_user",
      JSON.stringify(data)
    );

    setUser(data);
    setMessage("");

    if (data.role === "DOCTOR") {
      setPage("dashboard");
    } else if (data.role === "ADMIN") {
      setPage("admin");
    } else {
      setPage("doctors");
    }
  };

  const logout = () => {
    localStorage.removeItem("careflow_token");
    localStorage.removeItem("careflow_user");

    setUser(null);
    setSelectedDoctor(null);
    setMessage("");
    setPage("home");
  };

  const chooseDoctor = (doctor) => {
    if (!user) {
      setPage("login");
      return;
    }

    if (user.role !== "PATIENT") {
      setMessage(
        "Only patients can book appointments."
      );
      return;
    }

    setSelectedDoctor(doctor);
    setMessage("");
    setPage("book");
  };

  const bookingDone = (appointmentNumber) => {
    setMessage(
      `Appointment booked successfully! Appointment No: ${appointmentNumber}`
    );

    setPage("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <HeartPulse />
            </span>

            <span>
              <b className="block text-xl">
                CareFlow
              </b>

              <small className="text-slate-500">
                Healthcare made simple
              </small>
            </span>
          </button>

          <nav className="hidden gap-7 font-bold md:flex">

            <button
              onClick={() => setPage("home")}
            >
              Home
            </button>

            <button
              onClick={() => setPage("doctors")}
            >
              Doctors
            </button>

            {user && (
              <button
                onClick={() =>
                  setPage(
                    user.role === "ADMIN"
                      ? "admin"
                      : "dashboard"
                  )
                }
              >
                {user.role === "DOCTOR"
                  ? "Doctor Dashboard"
                  : user.role === "ADMIN"
                  ? "Admin Dashboard"
                  : "My Appointments"}
              </button>
            )}

          </nav>

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 font-bold"
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => setPage("login")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg"
            >
              <LogIn size={17} />
              Login
            </button>
          )}

        </div>

      </header>

      {/* GLOBAL MESSAGE */}

      {message && (
        <div className="mx-auto mt-4 max-w-7xl rounded-xl bg-green-50 p-4 font-semibold text-green-700">
          {message}
        </div>
      )}

      {/* PAGES */}

      {page === "home" && (
        <Home
          go={() => setPage("doctors")}
          login={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Login onLogin={login} />
      )}

      {page === "doctors" && (
        <Doctors
          doctors={doctors}
          choose={chooseDoctor}
        />
      )}

      {page === "book" &&
        selectedDoctor && (
          <Book
            doctor={selectedDoctor}
            onDone={bookingDone}
          />
        )}

      {page === "dashboard" &&
        user?.role === "PATIENT" && (
          <PatientDashboard />
        )}

      {page === "dashboard" &&
        user?.role === "DOCTOR" && (
          <DoctorDashboard />
        )}

      {page === "admin" &&
        user?.role === "ADMIN" && (
          <AdminDashboard />
        )}

      <footer className="mt-16 border-t bg-white p-8 text-center text-sm text-slate-500">
        CareFlow · React + Tailwind CSS · Spring Boot · MySQL
      </footer>

    </div>
  );
}

/* =========================
   HOME
========================= */

function Home({ go, login }) {
  return (
    <main>

      <section className="hero">

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center">

          <div>

            <span className="pill">
              ● Trusted appointment platform
            </span>

            <h1 className="mt-7 text-5xl font-black leading-tight md:text-6xl">
              Your health.
              <br />
              <span>Your schedule.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Find experienced doctors and book
              your appointment in just a few clicks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={go}
                className="primary"
              >
                Find a Doctor
                <ArrowRight size={18} />
              </button>

              <button
                onClick={login}
                className="secondary"
              >
                Patient / Doctor Login
              </button>

            </div>

          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl">

            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">

              <p className="text-blue-100">
                Today's health tip
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Take care of yourself.
              </h2>

              <p className="mt-3 leading-7 text-blue-100">
                Regular health checkups help you
                stay ahead and make better decisions.
              </p>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <Stat
                icon={<Stethoscope />}
                title="6"
                text="Available doctors"
              />

              <Stat
                icon={<CalendarDays />}
                title="Easy"
                text="Appointment booking"
              />

            </div>

          </div>

        </div>

      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-3">

        <Feature
          icon={<Stethoscope />}
          title="Specialists"
        />

        <Feature
          icon={<CalendarDays />}
          title="Easy Booking"
        />

        <Feature
          icon={<ShieldCheck />}
          title="Secure Login"
        />

      </div>

    </main>
  );
}

const Stat = ({
  icon,
  title,
  text,
}) => (
  <div className="rounded-2xl border p-5">

    <div className="text-blue-600">
      {icon}
    </div>

    <b className="mt-3 block text-2xl">
      {title}
    </b>

    <span className="text-slate-500">
      {text}
    </span>

  </div>
);

const Feature = ({
  icon,
  title,
}) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">

    <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
      {icon}
    </div>

    <h3 className="mt-4 text-lg font-black">
      {title}
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Simple and clear appointment management.
    </p>

  </div>
);

/* =========================
   LOGIN
========================= */

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (error) {
      setError(
        error.message || "Invalid login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-5 py-16">

      <div className="rounded-3xl border bg-white p-8 shadow-xl">

        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white">
          <LogIn />
        </div>

        <h1 className="mt-5 text-center text-3xl font-black">
          Welcome to CareFlow
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Patient or Doctor login
        </p>

        {error && (
          <div className="mt-5 flex gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
            <XCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={submit}
          className="mt-7 space-y-4"
        >

          <label>
            Email

            <input
              required
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@careflow.com"
              className="field"
            />

          </label>

          <label>
            Password

            <input
              required
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="field"
            />

          </label>

          <button
            disabled={loading}
            className="primary w-full disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">

          <b>Demo patient</b>
          <br />
          patient@careflow.com / patient123

          <br />
          <br />

          <b>Doctor example</b>
          <br />
          rashitha@careflow.com / rashitha123

        </div>

      </div>

    </main>
  );
}

/* =========================
   DOCTORS
========================= */

function Doctors({
  doctors,
  choose,
}) {

  const [query, setQuery] = useState("");

  const list = doctors.filter(
    (doctor) =>
      `${doctor.name || ""}${doctor.specialization || ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <p className="font-bold text-blue-600">
            OUR PROVIDERS
          </p>

          <h1 className="mt-1 text-4xl font-black">
            Find a doctor
          </h1>

          <p className="mt-2 text-slate-500">
            Choose a specialist and select your appointment date.
          </p>

        </div>

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search doctor or specialty"
            className="field pl-10 md:w-80"
          />

        </div>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {list.map((doctor) => (

          <div
            key={doctor.id}
            className="doctor-card"
          >

            <div className="flex items-center gap-4">

              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <UserRound size={30} />
              </div>

              <div>

                <h3 className="text-xl font-black">
                  {doctor.name}
                </h3>

                <p className="font-bold text-blue-600">
                  {doctor.specialization}
                </p>

              </div>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              {doctor.experience} years experience
              {" · "}
              {doctor.qualification ||
                "Qualified Doctor"}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {doctor.email}
            </p>

            <button
              onClick={() => choose(doctor)}
              className="primary mt-5 w-full"
            >
              Book Appointment
            </button>

          </div>

        ))}

      </div>

      {!list.length && (
        <div className="mt-8 rounded-2xl border border-dashed p-12 text-center text-slate-500">
          No doctors found.
        </div>
      )}

    </main>
  );
}

/* =========================
   BOOK APPOINTMENT
   NO SLOTS
========================= */

function Book({
  doctor,
  onDone,
}) {

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const [date, setDate] = useState(today);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const book = async () => {

    if (!date) {
      setError(
        "Please select appointment date."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await api(
        "/appointments",
        {
          method: "POST",

          body: JSON.stringify({
            doctorId: doctor.id,
            serviceId: 1,
            date: date,
            reason: reason,
          }),
        }
      );

      onDone(
        response.appointmentNumber
      );

    } catch (error) {

      setError(
        error.message ||
        "Unable to book appointment."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">

      <p className="font-bold text-blue-600">
        APPOINTMENT
      </p>

      <h1 className="mt-1 text-4xl font-black">
        Book with {doctor.name}
      </h1>

      <p className="font-bold text-blue-600">
        {doctor.specialization}
      </p>

      <div className="mt-7 grid gap-6 md:grid-cols-2">

        <div className="card">

          <div className="flex items-center gap-4">

            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <UserRound size={30} />
            </div>

            <div>

              <h2 className="text-xl font-black">
                {doctor.name}
              </h2>

              <p className="font-bold text-blue-600">
                {doctor.specialization}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {doctor.experience} years experience
              </p>

            </div>

          </div>

          <div className="mt-7 rounded-2xl bg-blue-50 p-5">

            <div className="flex items-center gap-3">

              <CalendarDays
                className="text-blue-600"
              />

              <div>

                <b>Appointment date</b>

                <p className="text-sm text-slate-500">
                  Select the date you want to visit.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="card">

          <h2 className="text-xl font-black">
            Appointment Details
          </h2>

          {error && (
            <div className="mt-5 flex gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-600">
              <XCircle size={20} />

              <span>
                {error}
              </span>
            </div>
          )}

          <label className="mt-5 block font-bold">

            Select date

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="field"
            />

          </label>

          <label className="mt-5 block font-bold">

            Reason for visit

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows="5"
              placeholder="Briefly describe your reason..."
              className="field"
            />

          </label>

          <button
            disabled={loading}
            onClick={book}
            className="primary mt-6 w-full disabled:bg-slate-300"
          >
            {loading
              ? "Booking..."
              : "Confirm Appointment"}
          </button>

        </div>

      </div>

    </main>
  );
}

/* =========================
   PATIENT DASHBOARD
========================= */

function PatientDashboard() {

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const load = async () => {

    setLoading(true);

    try {

      const data = await api(
        "/appointments/mine"
      );

      setAppointments(
        Array.isArray(data)
          ? data
          : []
      );

      setError("");

    } catch (error) {

      setError(
        error.message ||
        "Unable to load appointments."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">

      <p className="font-bold text-blue-600">
        PATIENT DASHBOARD
      </p>

      <h1 className="text-4xl font-black">
        My appointments
      </h1>

      {error && (
        <div className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {loading ? (

        <div className="mt-8 rounded-2xl border p-12 text-center text-slate-500">
          Loading appointments...
        </div>

      ) : (

        <div className="mt-7 space-y-4">

          {appointments.map(
            (appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            )
          )}

          {!appointments.length && (
            <Empty
              text="No appointments yet. Book your first consultation."
            />
          )}

        </div>

      )}

    </main>
  );
}

/* =========================
   DOCTOR DASHBOARD
========================= */

function DoctorDashboard() {

  const [appointments, setAppointments] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const load = async () => {

    setLoading(true);

    try {

      const data = await api(
        "/appointments/mine"
      );

      setAppointments(
        Array.isArray(data)
          ? data
          : []
      );

      setMessage("");

    } catch (error) {

      setMessage(
        error.message ||
        "Unable to load appointments."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const action = async (
    id,
    type
  ) => {

    try {

      await api(
        `/appointments/${id}/${type}`,
        {
          method: "POST",
        }
      );

      await load();

    } catch (error) {

      setMessage(
        error.message ||
        "Action failed."
      );

    }
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">

      <p className="font-bold text-blue-600">
        DOCTOR DASHBOARD
      </p>

      <h1 className="text-4xl font-black">
        My booked appointments
      </h1>

      {message && (
        <div className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">
          {message}
        </div>
      )}

      {loading ? (

        <div className="mt-8 rounded-2xl border p-12 text-center text-slate-500">
          Loading appointments...
        </div>

      ) : (

        <div className="mt-7 space-y-4">

          {appointments.map(
            (appointment) => (

              <div
                key={appointment.id}
                className="card"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center">

                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <UserRound />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="font-black">
                        {appointment.patientName ||
                          "Patient"}
                      </h3>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {appointment.appointmentNumber}
                      </span>

                    </div>

                    <p className="mt-1 text-sm text-slate-500">

                      {appointment.patientEmail}

                      {" · "}

                      {appointment.date}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.reason ||
                        "General consultation"}
                    </p>

                    <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                      {appointment.status}
                    </span>

                  </div>

                  {appointment.status !==
                    "CANCELLED" &&
                    appointment.status !==
                      "COMPLETED" && (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            action(
                              appointment.id,
                              "complete"
                            )
                          }
                          className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            action(
                              appointment.id,
                              "cancel"
                            )
                          }
                          className="rounded-xl border border-red-200 px-4 py-2 font-bold text-red-600"
                        >
                          Cancel
                        </button>

                      </div>

                    )}

                </div>

              </div>

            )
          )}

          {!appointments.length && (
            <Empty
              text="No appointments booked for you yet."
            />
          )}

        </div>

      )}

    </main>
  );
}


/* =========================
   ADMIN DASHBOARD
   ========================= */

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview");

  const load = async () => {
    setLoading(true);
    try {
      const [s, d, p, a] = await Promise.all([
        api("/admin/dashboard"),
        api("/admin/doctors"),
        api("/admin/patients"),
        api("/admin/appointments"),
      ]);
      setStats(s || {});
      setDoctors(Array.isArray(d) ? d : []);
      setPatients(Array.isArray(p) ? p : []);
      setAppointments(Array.isArray(a) ? a : []);
      setError("");
    } catch (e) {
      setError(e.message || "Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="rounded-2xl border bg-white p-12 text-center text-slate-500">Loading admin dashboard...</div>
    </main>
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-bold text-blue-600">ADMINISTRATION</p>
          <h1 className="mt-1 text-4xl font-black">Admin Dashboard</h1>
          <p className="mt-2 text-slate-500">Monitor CareFlow users and appointments.</p>
        </div>
        <button onClick={load} className="secondary">Refresh Data</button>
      </div>

      {error && <div className="mt-6 rounded-xl bg-red-50 p-4 font-semibold text-red-600">{error}</div>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat icon={<Users />} title="Patients" value={stats?.totalPatients ?? 0} />
        <AdminStat icon={<Stethoscope />} title="Doctors" value={stats?.totalDoctors ?? 0} />
        <AdminStat icon={<CalendarDays />} title="Appointments" value={stats?.totalAppointments ?? 0} />
        <AdminStat icon={<ClipboardList />} title="Total Users" value={stats?.totalUsers ?? 0} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <AdminStatus title="Booked" value={stats?.bookedAppointments ?? 0} cls="text-blue-600" />
        <AdminStatus title="Completed" value={stats?.completedAppointments ?? 0} cls="text-emerald-600" />
        <AdminStatus title="Cancelled" value={stats?.cancelledAppointments ?? 0} cls="text-red-600" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[['overview','Overview'],['appointments','Appointments'],['doctors','Doctors'],['patients','Patients']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} className={tab===k ? 'rounded-xl bg-blue-600 px-5 py-3 font-bold text-white' : 'rounded-xl border bg-white px-5 py-3 font-bold text-slate-700'}>{l}</button>
        ))}
      </div>

      {tab === "overview" && <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><LayoutDashboard /></div><div><h2 className="text-xl font-black">System Overview</h2><p className="text-sm text-slate-500">Current statistics</p></div></div>
          <div className="mt-6 space-y-4 text-sm">
            <AdminRow label="Total patients" value={stats?.totalPatients ?? 0}/><AdminRow label="Total doctors" value={stats?.totalDoctors ?? 0}/><AdminRow label="Total appointments" value={stats?.totalAppointments ?? 0}/><AdminRow label="Booked" value={stats?.bookedAppointments ?? 0}/><AdminRow label="Completed" value={stats?.completedAppointments ?? 0}/><AdminRow label="Cancelled" value={stats?.cancelledAppointments ?? 0}/>
          </div>
        </div>
        <div className="card"><h2 className="text-xl font-black">Recent Appointments</h2><div className="mt-5 space-y-3">{appointments.slice(0,5).map(a => <AdminAppointment key={a.id} a={a}/>)}{!appointments.length && <Empty text="No appointments found."/>}</div></div>
      </section>}

      {tab === "appointments" && <AdminTable title="All Appointments" headers={["Number","Patient","Doctor","Specialization","Date","Status","Reason"]}>
        {appointments.map(a => <div key={a.id} className="grid grid-cols-7 gap-3 border-b py-4 text-sm"><span className="font-bold text-blue-600">{a.appointmentNumber}</span><span>{a.patientName}</span><span>{a.doctorName}</span><span>{a.specialization}</span><span>{a.appointmentDate}</span><span><StatusBadge status={a.status}/></span><span className="truncate">{a.reason || "General consultation"}</span></div>)}
        {!appointments.length && <Empty text="No appointments found."/>}
      </AdminTable>}

      {tab === "doctors" && <AdminTable title="Doctor Management" headers={["Name","Email","Specialization","Qualification","Experience","Status"]} cols="grid-cols-6">
        {doctors.map(d => <div key={d.id} className="grid grid-cols-6 gap-3 border-b py-4 text-sm"><span className="font-bold">{d.name}</span><span>{d.email}</span><span>{d.specialization}</span><span>{d.qualification || "-"}</span><span>{d.experience ?? 0} years</span><span><span className={d.available ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700" : "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"}>{d.available ? "Available" : "Unavailable"}</span></span></div>)}
        {!doctors.length && <Empty text="No doctors found."/>}
      </AdminTable>}

      {tab === "patients" && <AdminTable title="Patient Management" headers={["Name","Email","Patient ID"]} cols="grid-cols-3">
        {patients.map(p => <div key={p.id} className="grid grid-cols-3 gap-3 border-b py-4 text-sm"><span className="font-bold">{p.name}</span><span>{p.email}</span><span>#{p.id}</span></div>)}
        {!patients.length && <Empty text="No patients found."/>}
      </AdminTable>}
    </main>
  );
}

function AdminStat({icon,title,value}) { return <div className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">{icon}</div><span className="text-3xl font-black">{value}</span></div><p className="mt-4 font-bold text-slate-600">{title}</p></div>; }
function AdminStatus({title,value,cls}) { return <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{title}</p><p className={`mt-2 text-3xl font-black ${cls}`}>{value}</p></div>; }
function AdminRow({label,value}) { return <div className="flex items-center justify-between border-b pb-3"><span className="text-slate-500">{label}</span><b>{value}</b></div>; }
function AdminAppointment({a}) { return <div className="rounded-xl border p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><b>{a.appointmentNumber}</b><p className="mt-1 text-sm text-slate-500">{a.patientName} · {a.doctorName}</p></div><StatusBadge status={a.status}/></div><p className="mt-2 text-xs text-slate-500">{a.appointmentDate}</p></div>; }
function StatusBadge({status}) { const s={BOOKED:"bg-blue-50 text-blue-700",COMPLETED:"bg-emerald-50 text-emerald-700",CANCELLED:"bg-red-50 text-red-700"}; return <span className={`rounded-full px-3 py-1 text-xs font-bold ${s[status] || "bg-slate-100 text-slate-700"}`}>{status || "UNKNOWN"}</span>; }
function AdminTable({title,headers,children,cols="grid-cols-7"}) { return <section className="mt-5"><div className="card overflow-x-auto"><h2 className="text-xl font-black">{title}</h2><div className="mt-5 min-w-[700px]"><div className={`grid ${cols} gap-3 border-b pb-3 text-xs font-black uppercase text-slate-500`}>{headers.map(h=><span key={h}>{h}</span>)}</div>{children}</div></div></section>; }

/* =========================
   APPOINTMENT CARD
========================= */

function AppointmentCard({
  appointment,
}) {

  return (
    <div className="card">

      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarDays />
        </div>

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <b className="text-lg">
              {appointment.doctorName ||
                "Doctor"}
            </b>

            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
              {appointment.appointmentNumber}
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500">

            {appointment.doctorSpecialization ||
              "Specialist"}

            {" · "}

            {appointment.date}

          </p>

          <p className="mt-1 text-sm text-slate-500">
            {appointment.reason ||
              "General consultation"}
          </p>

        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          {appointment.status}
        </span>

      </div>

    </div>
  );
}

/* =========================
   EMPTY
========================= */

const Empty = ({ text }) => (
  <div className="rounded-2xl border border-dashed p-12 text-center text-slate-500">
    {text}
  </div>
);

/* =========================
   START
========================= */

createRoot(
  document.getElementById("root")
).render(
  <App />
);