import React, { useEffect, useState } from "react";
import { ContentBody } from "./components/Viewer/ContentBody";
import { CriticalEditionDocument } from "./CriticalEditionData";

function App(props: { essayPath: string }) {
  const [essayContent, setEssayContent] = useState<CriticalEditionDocument>();

  useEffect(() => {
    if (essayContent) {
      console.log("essayContent loaded", essayContent);
      return;
    }
    console.log("essayContent", essayContent);
    fetch(props.essayPath)
      .then((content) => content.json())
      .then((jsonContent) => {
        setEssayContent(jsonContent);
      })
      .catch((error) => {
        return <div>Error Loading content</div>;
      });
  }, [essayContent, props.essayPath]);

  if (!essayContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ContentBody documentData={essayContent} />
    </div>
  );
}

export default App;
