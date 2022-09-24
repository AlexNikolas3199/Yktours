import { useQuery } from '@apollo/client'

import { FIND_ME_ADMIN } from '../gqls/admin'

export const useUser = () => {
    const { data, loading, error } = useQuery(FIND_ME_ADMIN)
    const user = data ? data.meAdmin : null
    return {
        loading,
        error,
        user
    }
}
