import { RepositoryListContainer } from '../../components/RepositoryList/index';
import { render, screen } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories.edges} />);

      const fullNames = screen.queryAllByTestId('fullName');
      expect(fullNames[0]).toHaveTextContent('jaredpalmer/formik');
      expect(fullNames[1]).toHaveTextContent('async-library/react-async');

      const descriptions = screen.queryAllByTestId('description');
      expect(descriptions[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(descriptions[1]).toHaveTextContent('Flexible promise-based React data loader');

      const languages = screen.queryAllByTestId('language');
      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      const stargazersCounts = screen.queryAllByTestId('stargazersCount');
      expect(stargazersCounts[0]).toHaveTextContent('21.9k');
      expect(stargazersCounts[1]).toHaveTextContent('1.8k');

      const forksCounts = screen.queryAllByTestId('forksCount');
      expect(forksCounts[0]).toHaveTextContent('1.6k');
      expect(forksCounts[1]).toHaveTextContent('69');

      const reviewCounts = screen.queryAllByTestId('reviewCount');
      expect(reviewCounts[0]).toHaveTextContent('3');
      expect(reviewCounts[1]).toHaveTextContent('3');

      const ratingAverages = screen.queryAllByTestId('ratingAverage');
      expect(ratingAverages[0]).toHaveTextContent('88');
      expect(ratingAverages[1]).toHaveTextContent('72');
    });
  });
});