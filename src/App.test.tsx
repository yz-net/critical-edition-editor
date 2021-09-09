import React from 'react';
import { render } from '@testing-library/react';

import { defaultProjectData } from 'Data/ProjectData';
import customRender from 'test_utils/customRender';
import { fixMissingScrollTo } from 'test_utils/mocks';
import { RenderApp } from './App';

fixMissingScrollTo();

it('renders error without context', () => {
  const { getByText } = render(<RenderApp />);
  expect(getByText('No Context passed to IndexPage')).toBeInTheDocument();
});

it('renders Critical Editions link', () => {
  const app = customRender(<RenderApp />, {
    projectData: { ...defaultProjectData(), title: 'My Test Project' },
    essays: [],
  });
  const { getAllByText } = app;
  const linkElement = getAllByText(/My Test Project/)[0].closest('a');
  expect(linkElement).toBeInTheDocument();
});
