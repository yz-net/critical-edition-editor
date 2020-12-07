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

export interface EssayDataEntry {
  supertitle?: string;
  title: string;
  essayPath: string;
  author: string;
  posterPath?: string;
  videoPath?: string;
  publicationDate: string;
}

const essays: {
  [essayID: string]: EssayDataEntry;
} = {
  krasilovskaia: {
    supertitle: "Introduction to the testimony of",
    title: "Liubov’ Krasilovskaia",
    author: "Author",
    videoPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/web-liubov-loop.mov",
    essayPath: "/data/intro-hvt-3280.json",
    publicationDate: "February 1, 2021",
  },
  saraffian: {
    supertitle: "Introduction to the testimony of",
    title: "Martha Saraffian",
    author: "Nikolaus Hagen",
    essayPath: "/data/intro-hvt-0237.json",
    publicationDate: "February 1, 2021",
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
  const essay: EssayDataEntry | undefined = essays[essayID];
  if (!essay) {
    return <div>NULL ESSAY</div>;
  }

  return (
    <Router>
      <Route path="/">
        <Viewer
          essay={essay}
          hash={location.hash}
          essayPath={essay.essayPath}
        />
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
