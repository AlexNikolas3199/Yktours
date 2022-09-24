import {gql} from '@apollo/client';

export const CREATE_ONE_PURCHASE = gql`
  mutation ($data: PurchaseCreateInput!) {
    createOnePurchase(data: $data) {
      url
      orderId
    }
  }
`;
export const REFUND_INPUT = gql`
  mutation ($data: RefundInput!) {
    refundInput(data: $data)
  }
`;
export const DELETE_ONE_TICKET = gql`
  mutation ($where: TicketWhereUniqueInput!) {
    deleteOneTicket(where: $where){
        id
    }
  }
`;
