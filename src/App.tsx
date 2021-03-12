import React, { useEffect, useState } from "react";
import Viewer from "./components/Viewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
// import DebugLogger from "./utils/DebugLogger";
import "./App.css";
// import EssayIndexItem from "./components/EssayIndexItem";
import IndexPage from "./components/IndexPage";
import { EssayDataEntry } from "./Data/EssayData";
import { ProjectData } from "./Data/ProjectData";
import Footer from "./components/Footer";
// import LogoBar from "./components/Viewer/LogoBar";

// const logger = new DebugLogger("App: ");
interface ViewerWrapperProps {
  essays: Array<EssayDataEntry>;
}
function ViewerWrapper(props: ViewerWrapperProps) {
  const { essays } = props;
  const location = useLocation();

  function BadViewRequest() {
    return <div>Error Loading Essay</div>;
  }
  const params: { essayID: string } = useParams();
  // const { essayID } = params;

  if (!params.essayID) {
    return <BadViewRequest />;
  }

  // look for essay
  const matches = essays.filter((e) => e.id === params.essayID);
  let essay: EssayDataEntry;
  if (matches.length === 1) {
    essay = matches[0];
  } else {
    return <div>Essay not found</div>;
  }

  // const essay: EssayDataEntry | undefined = essays[essayID];
  // if (!essay || ) {
  //   return <div>Essay not found</div>;
  // }

  return (
    <Router>
      <Route path="/">
        <Viewer
          homeLink={ProjectData.homeLink}
          essay={essay}
          hash={location.hash}
          essayPath={essay.essayPath}
          posterPath={essay.posterPath}
        />
      </Route>
    </Router>
  );
}

export default function App() {
  const [essays, setEssays] = useState<Array<EssayDataEntry>>([]);

  useEffect(() => {
    fetch("/data/config.json")
      .then((resp) => resp.json())
      .then((json) => {
        setEssays(json["essays"]);
      });
  }, []);

  return (
    <div className="App serif-copy-ff">
      <Router>
        <Switch>
          <Route path="/example-essay">
            {/* <Viewer essayPath={"/data/essay.json"} /> */}
          </Route>
          <Route path="/essay/:essayID">
            <ViewerWrapper essays={essays} />
          </Route>
          <Route path="/">
            <IndexPage
              projectTitle={ProjectData.title}
              projectSubtitle={ProjectData.subtitle || ""}
              projectDescription={ProjectData.introCopy || ""}
              backgroundImageURL="/img/ImpactHeaderBackground.jpg"
              essays={essays}
            />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}
