import {gql} from '@apollo/client'

export const UPLOAD = gql`
    mutation ($upload:Upload!){
        singleUpload(upload:$upload)
    }
`
export const MULTI_UPLOAD = gql`
    mutation ($upload:[Upload]!){
        multiUpload(upload:$upload)
    }
`
