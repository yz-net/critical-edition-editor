import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { RenderApp } from "./App";
import { EssayDataEntry } from "Data/EssayData";
import faker from "faker";

it("renders Critical Editions link", () => {
  const app = render(
    <RenderApp projectData={{ title: "Critical Editions" }} essays={[]} />
  );
  const { getAllByText } = app;
  const linkElement = getAllByText(/Critical Editions/)[0].closest("a");
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
  const app = render(
    <RenderApp
      projectData={{}}
      essays={Array(10)
        .fill(0)
        .map(() => fakeEssay())}
    />
  );

  expect(app.getAllByRole("listitem").length).toBe(10);
});
