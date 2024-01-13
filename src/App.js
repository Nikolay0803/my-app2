import "./App.css";
import { Route, Routes } from "react-router-dom";
import { DualRing } from "react-awesome-spinners";
import { Suspense, lazy, useState } from "react";
import PrivateRoutes from "./Component/PrivateRoutes.js/PrivateRoutes";
import { AuthContext } from "./context/AuthContext";
const NotFound = lazy(() => import("./Component/pages/NotFound"));
const About = lazy(() => import("./Component/pages/About"));
const Home = lazy(() => import("./Component/pages/Home"));
const Layout = lazy(() => import("./Component/Layout/Layout"));
const ListTodo = lazy(() => import("./Component/ListTodo/ListTodo"));
const EdiTodo = lazy(() => import("./Component/EdiTodo"));
const Error = lazy(() => import("./Component/pages/Error"));
const Login = lazy(() => import("./Component/pages/Login"));
const NotFoundUser = lazy(() => import("./Component/pages/NotFoundUser"));
const Registration = lazy(() => import("./Component/pages/Registration"));
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Suspense fallback={<DualRing />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="/todo"
                  element={
                    <PrivateRoutes>
                      <ListTodo />
                    </PrivateRoutes>
                  }
                />
                <Route path="/todo/:id" element={<EdiTodo />} />
                <Route path="/about" element={<About />} />
                <Route path="/error-page" element={<Error />} />
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/notuser" element={<NotFoundUser />} />
              <Route path="/reg" element={<Registration />} />
            </Routes>
          </Suspense>
        </AuthContext.Provider>
      </header>
    </div>
  );
}

export default App;
