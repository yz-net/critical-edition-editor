import { EssayDataEntry } from 'Data/EssayData';
import { defaultProjectData } from 'Data/ProjectData';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import customRender from 'test_utils/customRender';
import fakeEssay from 'test_utils/fakeEssay';
import { doAllMocks } from 'test_utils/mocks';
import EssayIndexItem from '.';

doAllMocks();

interface FakeEssayIndexItemProps {
  essay?: EssayDataEntry;
  textOnly?: boolean;
  showBylines?: boolean;
  showSupertitles?: boolean;
}

const fakeEssayIndexItem = ({
  essay,
  textOnly,
  showBylines,
  showSupertitles,
}: FakeEssayIndexItemProps) =>
  customRender(
    <MemoryRouter>
      <EssayIndexItem
        essay={essay || fakeEssay()}
        textOnly={textOnly === true}
        showBylines={showBylines !== false}
        showSupertitles={showSupertitles !== false}
      />
    </MemoryRouter>,
    {
      projectData: defaultProjectData(),
      essays: [],
    }
  );
it('EssayIndexItem renders with all fields enabled', () => {
  const app = fakeEssayIndexItem({});
  const articles = app.getAllByRole('article');
  expect(articles.length).toBe(1);
  expect(app.getByLabelText(/Supertitle for */i)).toBeInTheDocument();
  expect(app.getByLabelText(/Author byline for */i)).toBeInTheDocument();
  expect(app.getByLabelText(/Thumbnail Video for */i)).toBeInTheDocument();
});

it('EssayIndexItem renders without byline element', () => {
  const app = fakeEssayIndexItem({ showBylines: false });
  expect(app.queryByLabelText(/Author byline for */i)).not.toBeInTheDocument();
});

it('EssayIndexItem renders without video element', () => {
  const app = fakeEssayIndexItem({ textOnly: true });

  expect(
    app.queryByLabelText(/Thumbnail Video for */i)
  ).not.toBeInTheDocument();
});

it('EssayIndexItem renders without supertitle element', () => {
  const app = fakeEssayIndexItem({ showSupertitles: false });
  expect(app.queryByLabelText(/Supertitle for */i)).not.toBeInTheDocument();
});
