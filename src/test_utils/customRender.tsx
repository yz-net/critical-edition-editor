import React from "react";
import { render } from "@testing-library/react";

import { DataContext, DataContextObject } from "Data/Context";

export default function customRender(ui: JSX.Element, data: DataContextObject) {
  return render(
    <DataContext.Provider value={data}> {ui} </DataContext.Provider>
  );
}
