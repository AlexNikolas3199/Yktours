import { gql } from '@apollo/client'

export const FIND_MANY_RECORD = gql`
    query($where:PrivaterecordWhereInput, $take: Int, $skip: Int) 
    {
        findManyPrivaterecord(where:$where, take: $take, skip: $skip){
            id
            dateTime
            doctors{
                id
                name
                surname
                patronimyc
                category{
                    title
                }
            
            }
            patient{
                snils
                extend{
                    name
                    phone
                }
                users{
                    phone
                }
            }
        }
        findManyPrivaterecordCount
    }
`

export const FIND_MANY_FREE_RECORD = gql`
    query($where:PrivatefreetimerecordWhereInput, $take: Int, $skip: Int) 
    {
    findManyPrivatefreetimerecord(where:$where, take: $take, skip: $skip){
            id
            dateTime
            doctors{
                id
                name
                surname
                patronimyc
                category{
                    title
                }
            
            }
        }
        findManyPrivatefreetimerecordCount
}
`

export const CREATE_ONE_FREE_RECORD = gql`
    mutation($data:PrivatefreetimerecordCreateInput!){
        createOnePrivatefreetimerecord(data:$data){
	        id
        }
}
`