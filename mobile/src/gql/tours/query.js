import {gql} from '@apollo/client';

export const FIND_MANY_ROUTE1 = gql`
  query ($where: RouteWhereInput) {
    findManyRoute(where: $where) {
      id
      image
      Pricing
      duration
      date
      createdAt
      Desc
      DescEng
      route
      routeEng
      ship
    }
  }
`;

export const FIND_MANY_ROUTE = gql`
  query ($where: RouteWhereInput) {
    findManyRoute(where: $where) {
      id
      image
      food
      foodKids
      Pricing
      duration
      date
      createdAt
      Desc
      DescEng
      route
      routeEng
      ship
      ticket {
        room
      }
      bookedRoom {
        room
      }
    }
  }
`;
