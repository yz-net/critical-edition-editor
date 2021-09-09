import { defaultProjectData } from 'Data/ProjectData';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import customRender from 'test_utils/customRender';
import fakeEssay from 'test_utils/fakeEssay';
import { fixMissingScrollTo, fixMutedVideoBug } from 'test_utils/mocks';
import IndexPage from '.';

fixMutedVideoBug();
fixMissingScrollTo();

it('index renders expected number of list items', () => {
  const app = customRender(
    <MemoryRouter>
      <IndexPage />
    </MemoryRouter>,
    {
      projectData: defaultProjectData(),
      essays: Array(10)
        .fill(0)
        .map(() => fakeEssay()),
    }
  );
  const listItems = app.getAllByRole('listitem');
  expect(listItems.length).toBe(10);
});
