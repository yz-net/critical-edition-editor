import React from "react";
import { render } from "@testing-library/react";
import { RenderApp } from "./App";
import { EssayDataEntry } from "Data/EssayData";
import faker from "faker";
import { DataContext, DataContextObject } from "Data/Context";
import { defaultProjectData } from "Data/ProjectData";

window.scrollTo = () => {};

it("renders error without context", () => {
  const { getByText } = render(<RenderApp />);
  expect(getByText("No Context passed to IndexPage")).toBeInTheDocument();
});

function customRender(ui: JSX.Element, data: DataContextObject) {
  return render(<DataContext.Provider value={data}>{ui}</DataContext.Provider>);
}

it("renders Critical Editions link", () => {
  const app = customRender(<RenderApp />, {
    projectData: { ...defaultProjectData(), title: "My Test Project" },
    essays: [],
  });
  const { getAllByText } = app;
  const linkElement = getAllByText(/My Test Project/)[0].closest("a");
  expect(linkElement).toBeInTheDocument();
});

function fakeEssay(): EssayDataEntry {
  return {
    id: faker.datatype.uuid(),
    essayPath: faker.internet.url(),
    title: faker.lorem.sentence(),
    author: faker.name.firstName() + faker.name.lastName(),
    publicationDate: "",
  };
}

it("index renders expected number of list items", () => {
  const app = customRender(<RenderApp />, {
    projectData: defaultProjectData(),
    essays: Array(10)
      .fill(0)
      .map(() => fakeEssay()),
  });
  const listItems = app.getAllByRole("listitem");
  expect(listItems.length).toBe(10);
});
