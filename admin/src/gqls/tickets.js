import { gql } from '@apollo/client'

export const FIND_MANY_TICKETS = gql`
    query($where: TicketWhereInput, $skip: Int, $take: Int) {
        findManyTicket(where: $where, skip: $skip, take: $take) {
            id
        }
    }
`