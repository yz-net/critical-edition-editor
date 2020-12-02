import React from "react";
import Viewer from "./components/Viewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import DebugLogger from "./utils/DebugLogger";
import "./App.css";

const essays: { [essayID: string]: { title: string; essayPath: string } } = {
  krasilovskaia: {
    title: "Introduction to the testimony of Liubov’ Krasilovskaia",
    essayPath: "/data/with-v-footnote.json",
  },
};

const logger = new DebugLogger("App: ");

function ViewerWrapper() {
  const location = useLocation();
  function BadViewRequest() {
    return <div>Error Loading Essay</div>;
  }
  const params: { essayID: string } = useParams();
  const { essayID } = params;
  if (!params.essayID) {
    return <BadViewRequest />;
  }
  const essay: { essayPath: string } | undefined = essays[essayID];
  if (!essay) {
    return <div>NULL ESSAY</div>;
  }

  return (
    <Router>
      <Route path="/">
        <Viewer hash={location.hash} essayPath={essay.essayPath} />
      </Route>
    </Router>
  );
}

export default function App() {
  // return <Viewer essayPath={"./data/essay.json"} />;
  return (
    <Router>
      <Switch>
        <Route path="/example-essay">
          {/* <Viewer essayPath={"/data/essay.json"} /> */}
        </Route>
        <Route path="/essay/:essayID">
          <ViewerWrapper />
        </Route>
        <Route path="/">
          {Object.keys(essays).map((essayID: string, i: number) => {
            const essay: { title: string; essayPath: string } | undefined =
              essays[essayID];
            if (!essay) {
              logger.warn("bad essay id: " + essayID);
              return null;
            }
            return (
              <div key={i}>
                <Link to={`/essay/${essayID}`}>{essay.title}</Link>
              </div>
            );
          })}
        </Route>
      </Switch>
    </Router>
  );
}
