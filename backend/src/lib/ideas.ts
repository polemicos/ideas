import _ from 'lodash';

export const ideas = _.times(100, (i) => ({
  id: i,
  title: `Idea ${i}`,
  description: `Description of idea ${i}`,
  text: _.times(50, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));
