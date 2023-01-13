import { useState, useEffect } from "react";
import "./App.css";
import Todos from "./Components/Todos";
import Todo from "./Components/Todo";
import CreateTodo from "./Components/CreateTodo";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import SearchFeed from "./Components/SearchFeed";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Cookies from 'universal-cookie'


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [searchTodos, setSearchTodos] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const cookies = new Cookies()

  const checkLogin = () => {
    const token = cookies.get('jwt_token')

    if (token === undefined && location.pathname !== '/register') {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Todos
                todos={todos}
                setTodos={setTodos}
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
                user={user}
                setUser={setUser}
              />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/createtodo"
          element={
            <>
              <CreateTodo />
            </>
          }
        />

        <Route
          path="/:todoId"
          element={
            <>
              <Navbar
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Todo />
            </>
          }
        />
            <Route exact path="/search/:searchTerm" element={<>
              <Navbar
                searchTodos={searchTodos}
                setSearchTodos={setSearchTodos}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <SearchFeed todos={todos} setTodos={setTodos} searchTodos={searchTodos} setSearchTodos={setSearchTodos}/> 
            </>} 
            />

      </Routes>
      {/* {(() => {
        switch (location.pathname) {
          case location.pathname === "/createtodo":
            return (
              <Routes>
                <Route path="/createTodo" element={<CreateTodo />} />
              </Routes>
            );

          case location.pathname === "/login":
            return <Login/>
        }
      })()} */}
      {/* {location.pathname === "/createtodo" ? (
        <Routes>
          <Route path="/createTodo" element={<CreateTodo />} />
        </Routes>
      ) : (
        <div id="container">
          <Navbar searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>
          <Routes>
            <Route exact path="/" element={<Todos todos={todos} setTodos={setTodos} searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>} />
            <Route path="/:todoId" element={<Todo />} />
            <Route exact path="/search/:searchTerm" element={<SearchFeed todos={todos} setTodos={setTodos} searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>} />
          </Routes>
        </div>
      )} */}
    </>
  );
}

export default App;
