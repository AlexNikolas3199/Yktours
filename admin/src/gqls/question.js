import { gql } from '@apollo/client'

export const FIND_MANY_QUESTION = gql`
    query($take: Int, $skip: Int, $orderBy: QuestionOrderByInput) {
        findManyQuestion(take: $take, skip: $skip, orderBy: $orderBy) {
            id
            createdAt
            text
            contact
        }

        findManyQuestionCount
    }
`
