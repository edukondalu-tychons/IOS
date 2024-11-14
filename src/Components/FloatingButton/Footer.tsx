import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 © ASSA ABLOY. All Rights Reserved.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        position: 'absolute',
        top: '92%',
        bottom: 0,
        paddingVertical: 10,
        alignItems: 'center', // Center the content horizontally
    },
    footerText: {
        fontSize: 12,
        color: '#fff', // Set the text color
    }
})

export default Footer