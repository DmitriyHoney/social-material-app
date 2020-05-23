import React from "react";
import {Route} from "react-router-dom";
//Styles
import "./App.css";
//Components
import Preview from "./components/common/Preview/Preview";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Users from "./components/Users/Users";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";

const App = props => {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <div className="content">
          <Route path={'/users'} render={() => <Users/>}/>
          <Route path={'/dialogs'} render={() => <Dialogs/>}/>
          <Route path={'/profile'} render={() => <Profile/>}/>
      </div>
      {/*<Preview/>*/}
    </div>
  );
}

export default App;
