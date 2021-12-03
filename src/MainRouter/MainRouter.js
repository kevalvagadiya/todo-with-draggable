import React from "react";
import { Route, Switch } from "react-router-dom";

import CreatedTaskModule from "../Components/CreatedTaskModule";
import NavBar from "../NavBar/navBar";
import CompletedTaskModule from "../Components/CompletedTaskModule";

const MainRouter = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={CreatedTaskModule}></Route>
      <Route exact path="/create" component={CreatedTaskModule}></Route>
      <Route exact path="/completed" component={CompletedTaskModule}></Route>
    </Switch>
  </>
);

export default MainRouter;
