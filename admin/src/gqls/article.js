import { gql } from '@apollo/client'

export const FIND_MANY_ARTICLE = gql`
    query($where: ArticleWhereInput, $orderBy: ArticleOrderByInput, $skip: Int, $take: Int) {
        findManyArticle(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const FIND_UNIQUE_ARTICLE = gql`
    query($where: ArticleWhereUniqueInput!) {
        findUniqueArticle(where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const CREATE_ONE_ARTICLE = gql`
    mutation($data: ArticleCreateInput!) {
        createOneArticle(data: $data) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const UPDATE_ONE_ARTICLE = gql`
    mutation($data: ArticleUpdateInput!, $where: ArticleWhereUniqueInput!) {
        updateOneArticle(data: $data, where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`

export const DELETE_ONE_ARTICLE = gql`
    mutation($where: ArticleWhereUniqueInput!) {
        deleteOneArticle(where: $where) {
            id
            createdAt
            updatedAt
            title
            banner
            content
        }
    }
`
