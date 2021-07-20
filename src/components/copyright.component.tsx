import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

function Copyright() {
    const year = new Date().getFullYear().toString();

    return (
        <>
            <Text style={styles.copyright} appearance='hint'>© {year} Robert Gordon University</Text>
            <Text style={styles.copyright} appearance='hint'>Aberdeen, United Kingdom.</Text>
        </>
    )
}

const styles = StyleSheet.create({
    copyright: {}
})

export default Copyright;