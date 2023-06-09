import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { useTailwind } from "tailwind-rn";
import AchievementIcon from 'components/AchievementIcon';
import { Achievement } from 'models/Achievement';
import { StyleSheet } from 'react-native';

export default function AchievementModal({ isVisible, onClose, achievement }: { isVisible: boolean, onClose: any, achievement: Achievement | null }) {

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const styles = StyleSheet.create({
        modal: {
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        content: {
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            paddingTop: 10,
            marginBottom: 40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        title: {
            textAlign: 'center',
            color: '#0ab906',
            fontWeight: 'bold',
            fontSize: 18,

        },
        separator: {
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginVertical: 10,
        },
        achievementRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        },
        achievementName: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
        },
        achievementDescription: {
            textAlign: 'center',
        },
    });

    // Utilisez ces styles dans votre composant
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            backdropColor="transparent"
            style={styles.modal}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Haut fait débloqué</Text>

                {/* Ajout du trait de séparation */}
                <View style={styles.separator} />

                <View style={styles.achievementRow}>
                    <AchievementIcon achievement={achievement} />

                    <Text style={styles.achievementName}>{achievement?.name}</Text>
                </View>
                <Text style={styles.achievementDescription}>{achievement?.description}</Text>
            </View>
        </Modal>
    );
}

