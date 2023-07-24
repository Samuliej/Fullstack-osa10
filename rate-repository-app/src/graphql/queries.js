import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

/*
const REVIEWS = gql`
  fragment Reviews on Repository {
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
`;
*/

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $after: String,
    $first: Int) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first) {
      edges {
        node {
          ...RepositoryDetails
        },
        cursor
      },
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;


export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;