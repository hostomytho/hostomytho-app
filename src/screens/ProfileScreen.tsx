import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/auth/withAuth';
import { useUser } from '../services/auth/UserContext';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = (props) => {
    const tw = useTailwind();
    const { user } = useUser();

    const achievements = [
        { id: 1, title: 'Premier texte validé' },
        { id: 2, title: '10 annotations créées' },
    ];

    const stats = [
        { id: 1, title: 'Textes validés', count: 5 },
        { id: 2, title: 'Annotations créées', count: 15 },
    ];

    const ranking = [
        { position: 31, username: 'Utilisateur31', points: 540 },
        { position: 32, username: user?.username, points: 530 },
        { position: 33, username: 'Utilisateur33', points: 520 },
    ];

    const { navigation } = props;

    const currentPoints = user?.points || 0;
    const nextRewardPoints = 1000;
    const pointsPercentage = (currentPoints / nextRewardPoints) * 100;

    return (
        <ScrollView style={tw('flex-1 p-4')}>
            <Text style={tw('text-2xl font-bold mb-2')}>{user?.username}</Text>

            <Text style={tw('text-lg mb-4')}>Points: {user?.points}</Text>


            <View style={tw('w-full mt-4')}>
                <Text style={tw('text-xl font-bold mb-2')}>
                    Progression avant la prochaine récompense
                </Text>
                <View style={tw('bg-gray-300 h-4 rounded')}>
                    <View
                        style={[
                            tw('bg-blue-500 h-full rounded-l'),
                            { width: `${pointsPercentage}%` },
                        ]}
                    ></View>
                </View>
                <Text style={tw('text-xs mt-1')}>
                    {currentPoints} / {nextRewardPoints} points
                </Text>
            </View>

            <View style={tw('')}>
                <Text style={tw('text-xl font-bold mt-4 mb-2')}>Classement</Text>
                {ranking.map((rank) => (
                    <View
                        key={rank.position}
                        style={[
                            tw('p-2 flex-row items-center justify-between'),
                            rank.position === 32 && tw('bg-blue-100'),
                        ]}
                    >
                        <Text>
                            {rank.position}. {rank.username}
                        </Text>
                        <Text>{rank.points} points</Text>
                    </View>
                ))}
                <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                    <Text style={tw('text-blue-500 mt-1')}>Voir le classement complet</Text>
                </TouchableOpacity>
            </View>

            <View style={tw('flex-row justify-between my-6')}>
                <View style={tw('flex-1 mr-2')}>
                    <Text style={tw('text-xl font-bold mb-2')}>Hauts faits</Text>
                    {achievements.map((achievement) => (
                        <Text key={achievement.id}>{achievement.title}</Text>
                    ))}
                    <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
                        <Text style={tw('text-blue-500 mt-1')}>Tout afficher</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw('flex-1 ml-2')}>
                    <Text style={tw('text-xl font-bold mb-2')}>Statistiques</Text>
                    {stats.map((stat) => (
                        <Text key={stat.id}>
                            {stat.title}: {stat.count}
                        </Text>
                    ))}
                    <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                        <Text style={tw('text-blue-500 mt-1')}>Tout afficher</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={tw(' text-base mb-1 my-2')}>
                {user?.email ? user.email : "Vous n'avez pas renseigné d'email"}
            </Text>

            <View style={tw('flex-row mt-4')}>
                <TouchableOpacity
                    style={tw('bg-blue-500 px-4 py-2 rounded mr-2')}
                    onPress={() => navigation.navigate('Contacts')}
                >
                    <Text style={tw('text-white')}>
                        <FontAwesome5 name='user-friends' size={24} color='white' />
                        Mes contacts
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw('bg-green-500 px-4 py-2 rounded ml-2')}
                    onPress={() => navigation.navigate('Refer')}
                >
                    <Text style={tw('text-white')}>Parrainer quelqu'un</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default withAuth(ProfileScreen);
