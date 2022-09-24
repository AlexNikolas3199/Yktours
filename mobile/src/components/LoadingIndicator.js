import React from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import { THEME } from '../utils/theme'

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
        </View>
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
