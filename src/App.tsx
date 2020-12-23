import React from "react";
import Viewer from "./components/Viewer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import DebugLogger from "./utils/DebugLogger";
import "./App.css";
import EssayIndexItem from "./components/EssayIndexItem";

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
    title: "Liubov’ Naumovna Krasilovskaia",
    author: "Sarah Garibova",
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
    posterPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background.png",
    videoPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background-loop.mp4",
    publicationDate: "February 1, 2021",
  },
  fox: {
    supertitle: "Introduction to the testimony of",
    title: "Esther Fox",
    author: "Sari Siegel",
    essayPath: "/data/intro-hvt-2033.json",
    publicationDate: "February 1, 2021",
  },
  frei: {
    supertitle: "Introduction to the testimony of",
    title: "Hans Frei",
    author: "Ion Popa",
    essayPath: "/data/intro-hvt-0170.json",
    posterPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background.png",
    videoPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background-loop.mp4",
    publicationDate: "February 1, 2021",
  },
  zawistowska: {
    supertitle: "Introduction to the testimony of",
    title: "Władysława Zawistowska",
    author: "Paweł Machcewicz",
    essayPath: "/data/intro-hvt-3169.json",
    publicationDate: "February 1, 2021",
  },
  zwolinska: {
    supertitle: "Introduction to the testimony of",
    title: "Helena Balicka-Zwolińska",
    author: "Anna Machcewicz",
    essayPath: "/data/intro-hvt-3164.json",
    publicationDate: "February 1, 2021",
  },
  riegner: {
    supertitle: "Introduction to the testimony of",
    title: "Gerhart M. Riegner",
    author: "Gil Rubin",
    essayPath: "/data/intro-hvt-0764.json",
    posterPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/background.png",
    videoPath:
      "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/hvt-0764-background-loop.mp4",
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
            const essay: EssayDataEntry = essays[essayID];
            if (!essay) {
              logger.warn("bad essay id: " + essayID);
              return null;
            }
            return <EssayIndexItem essayID={essayID} key={i} essay={essay} />;
          })}
        </Route>
      </Switch>
    </Router>
  );
}
