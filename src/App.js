import React from "react";
import NavigationBar from "./components/Navigation/NavigationBar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import DatabaseContext from "./context/DatabaseContext";
import StorageContext from "./context/StorageContext";
import Login from "./components/LoginSystem/Login";
import Signup from "./components/LoginSystem/Signup";
import PrivateRoute from "./components/Navigation/PrivateRoute";
import NoTestUserRoute from "./components/Navigation/NoTestUserRoute";
import Dashboard from "./components/LoginSystem/Dashboard";
import UpdateProfile from "./components/LoginSystem/UpdateProfile";
import Main from "./components/MainComponents/Main";
import Welcome from "./components/Welcome";
import ForgotPassword from "./components/LoginSystem/ForgotPassword";
import RecipeDetailed from "./components/MainComponents/RecipeDetailed";
import ErrorScreen from "./components/ErrorScreen";
import Footer from "./components/Footer";
import RecipeUpload from "./components/MainComponents/RecipeUpload";
import MyRecipeList from "./components/LoginSystem/MyRecipeList";
import MyFavouritesList from "./components/LoginSystem/MyFavouritesList";
import RecipeEdit from "./components/MainComponents/RecipeEdit";

function App() {
  return (
    <Router>
      <AuthContext>
        <DatabaseContext>
          <StorageContext>
            <NavigationBar />
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/my-profile" component={Dashboard} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <NoTestUserRoute exact path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/recipes" component={Main} />
              <PrivateRoute path="/create-recipe" component={RecipeUpload} />
              <Route exact path="/recipes/not-found" render={(props) => <ErrorScreen text="Nincs ilyen recept :(" />} />
              <PrivateRoute path="/recipes/:id" component={RecipeDetailed} />
              <PrivateRoute path="/edit-recipe/:id" component={RecipeEdit} />
              <PrivateRoute path="/my-recipes" component={MyRecipeList} />
              <PrivateRoute path="/favourites" component={MyFavouritesList} />
              <Route path="/" component={Welcome} />
            </Switch>
            <Footer />
          </StorageContext>
        </DatabaseContext>
      </AuthContext>
    </Router>
  );
}

export default App;
