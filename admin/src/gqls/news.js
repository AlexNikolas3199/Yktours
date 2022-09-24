import { gql } from '@apollo/client'

export const FIND_MANY_NEWS = gql`
    query($where: NewsWhereInput, $orderBy: NewsOrderByInput, $skip: Int, $take: Int) {
        findManyNews(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const FIND_UNIQUE_NEWS = gql`
    query($where: NewsWhereUniqueInput!) {
        findUniqueNews(where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const CREATE_ONE_NEWS = gql`
    mutation($data: NewsCreateInput!) {
        createOneNews(data: $data) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const UPDATE_ONE_NEWS = gql`
    mutation($data: NewsUpdateInput!, $where: NewsWhereUniqueInput!) {
        updateOneNews(data: $data, where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const DELETE_ONE_NEWS = gql`
    mutation($where: NewsWhereUniqueInput!) {
        deleteOneNews(where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`
