import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../App";
import Landing from "../Landing";
import FullList from "../FullList";

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app" component={App} />
        <Route path="/fulllist" component={FullList} />
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }
}
