import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Header from "../components/Header";
import { Grid } from "../elements";
function App() {
  return (
    <>
      <Grid>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
        </BrowserRouter>
      </Grid>
    </>
  );
}

export default App;
