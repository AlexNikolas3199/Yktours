import {gql} from '@apollo/client';

export const FIND_MANY_TICKET = gql`
  query ($where: TicketWhereInput) {
    findManyTicket(where: $where) {
      id
      orderId
      amount
      food
      foodEng
      room
      postId
      passengers {
        id
        name
        surname
        patronymic
        dateOfBirth
        documentType
        documentNumber
        food
      }
      route {
        id
        image
        duration
        date
        route
        routeEng
      }
    }
  }
`;
