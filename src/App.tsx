import React from "react";
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
import { EssayDataEntry, essays } from "./EssayData";

// const logger = new DebugLogger("App: ");

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
    <div className="App">
      <Router>
        <Switch>
          <Route path="/example-essay">
            {/* <Viewer essayPath={"/data/essay.json"} /> */}
          </Route>
          <Route path="/essay/:essayID">
            <ViewerWrapper />
          </Route>
          <Route path="/">
            <IndexPage
              projectTitle="Critical Edition Series"
              projectDescription=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin sit amet lectus id rhoncus. Nunc convallis euismod tortor, nec molestie magna faucibus et. Vestibulum ante orci, laoreet at arcu sed, fermentum placerat justo. Nullam fringilla ac ex suscipit pretium. Donec tincidunt semper ligula, ac hendrerit leo scelerisque nec. Aenean semper placerat neque. Proin interdum ut purus ut aliquet. Etiam et purus rhoncus, venenatis sapien ut, blandit nisl. Proin ac efficitur est. Nullam id mattis nulla. Maecenas sagittis tellus ac ante tincidunt tincidunt. Curabitur nibh enim, malesuada in nibh vitae, mattis scelerisque ex. Maecenas ut nulla vel ex mollis feugiat vulputate vitae sem. "
              essays={essays}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
