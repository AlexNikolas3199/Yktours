import { gql } from '@apollo/client'
export const CREATE_ONE_TICKET = gql`
mutation($data: TicketCreateInput!) {
    createOneTicket(data: $data) {
         id
        }
    }
`