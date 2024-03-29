import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTailwind } from 'tailwind-rn';
import { getAllTexts, deleteText, updateText, createText } from 'services/api/texts';
import { getAllThemes } from 'services/api/themes';
import { Text as TextModel } from 'models/Text';
import { Theme as ThemeModel } from 'models/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function ManageTextsScreen() {
    const tw = useTailwind();
    const queryClient = useQueryClient();
    const { isLoading, error, data: texts } = useQuery('texts', getAllTexts);
    const { data: themes } = useQuery('themes', getAllThemes);
    const [selectedText, setSelectedText] = useState<TextModel | null>(null);
    const [content, setContent] = useState('');
    const [plausibility, setPlausibility] = useState<number | undefined>(0);
    const [origin, setOrigin] = useState<string | undefined>('synthétique');
    const [id_theme, setId_theme] = useState<number | undefined>(undefined);
    const [isCreating, setIsCreating] = useState(false);
    const [includeSentences, setIncludeSentences] = useState(true);
    const [num, setNum] = useState<string | undefined>(undefined);
    const [isHypothesisSpecificationTest, setIsHypothesisSpecificationTest] = useState(false);
    const [isConditionSpecificationTest, setIsConditionSpecificationTest] = useState(false);
    const [isNegationSpecificationTest, setIsNegationSpecificationTest] = useState(false);
    const [isPlausibilityTest, setIsPlausibilityTest] = useState(false);

    const origins = [
        { id: 1, name: 'synthétique' },
        { id: 2, name: 'réel - vrai' },
        { id: 3, name: 'réel - faux' }
    ];

    // // // Création texte
    const createMutation = useMutation(createText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
            setIsCreating(false);
            setContent('');
            setPlausibility(0);
            setOrigin('synthétique');
            setId_theme(undefined);
            setNum(undefined);
            setIsHypothesisSpecificationTest(false);
            setIsConditionSpecificationTest(false);
            setIsNegationSpecificationTest(false);
            setIsPlausibilityTest(false);
        },
    });

    const handleCreate = () => {
        setIsCreating(true);
        setContent('');
        setPlausibility(0);
        setOrigin('synthétique');
        setId_theme(undefined);
    };

    const handleCreateSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isCreating) {
            createMutation.mutate({
                content,
                id_theme,
                num,
                origin,
                test_plausibility: plausibility,
                is_hypothesis_specification_test: isHypothesisSpecificationTest,
                is_condition_specification_test: isConditionSpecificationTest,
                is_negation_specification_test: isNegationSpecificationTest,
                is_plausibility_test: isPlausibilityTest,
                includeSentences: includeSentences
            });
        }
    };


    // // // Suppression
    // TODO A revoir 
    const deleteMutation = useMutation(deleteText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    // // // Modification
    // TODO A revoir 
    const updateMutation = useMutation(updateText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
            setSelectedText(null);
            setContent('');
            setPlausibility(0);
            setOrigin('');
            setId_theme(0);
        },
    });

    const handleUpdate = (text: TextModel | null) => {
        if (text) {
            setSelectedText(text);
            setContent(text.content);
            setPlausibility(text.test_plausibility);
            setOrigin(text.origin);
            setId_theme(text.id_theme);
        } else {
            setContent('');
            setPlausibility(undefined);
            setOrigin('');
            setId_theme(undefined);
        }
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedText) {
            updateMutation.mutate({
                text: {
                    id: selectedText.id,
                    content,
                    // test_plausibility,
                    origin,
                    id_theme,
                }
            });
        }
    };

    if (isLoading) return <View><Text>Chargement...</Text></View>;
    if (error) return <View><Text>Une erreur s'est produite.</Text></View>;


    return (
        <ScrollView style={tw('p-5')}>
            <TouchableOpacity
                onPress={handleCreate}
                style={tw('px-4 py-2 mb-5 bg-blue-500 text-white rounded-md flex-row items-center justify-center')}
            >
                <Ionicons name="add-outline" size={24} color="white" />
                <Text style={tw('text-white ml-2')}>Ajouter un nouveau texte</Text>
            </TouchableOpacity>
            {isCreating ? (
                <View style={tw('border p-4 mb-4 rounded')}>
                    <TextInput
                        multiline
                        numberOfLines={6}
                        style={tw('border p-2 mb-4')}
                        onChangeText={setContent}
                        value={content}
                        placeholder="Contenu"
                    />
                    <TextInput
                        style={tw('border p-2 mb-4')}
                        onChangeText={setNum}
                        value={num}
                        placeholder="Numéro"
                    />
                    <Picker
                        selectedValue={origin}
                        onValueChange={(origin: string) => setOrigin(origin)}
                        style={tw('border p-2 mb-4')}
                    >
                        {origins.map((origin: { id: number, name: string }) => (
                            <Picker.Item key={origin.id} label={origin.name} value={origin.name} />
                        ))}
                    </Picker>
                    <TextInput
                        style={tw('border p-2 mb-4')}
                        onChangeText={value => setPlausibility(Number(value))}
                        value={plausibility !== undefined ? String(plausibility) : ''}
                        placeholder="Plausibilité (0 par défaut)"
                        keyboardType="numeric"
                    />
                    <View style={tw('flex-row justify-around items-center')}>
                        <View style={tw('flex-1 items-center')}>
                            <Text>Test d'hypothèse</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#8FEE89" }}
                                thumbColor={isHypothesisSpecificationTest ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={setIsHypothesisSpecificationTest}
                                value={isHypothesisSpecificationTest}
                            />
                        </View>
                        <View style={tw('flex-1 items-center')}>
                            <Text>Test de condition</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#8FEE89" }}
                                thumbColor={isConditionSpecificationTest ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={setIsConditionSpecificationTest}
                                value={isConditionSpecificationTest}
                            />
                        </View>
                        <View style={tw('flex-1 items-center')}>
                            <Text>Test de négation</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#8FEE89" }}
                                thumbColor={isNegationSpecificationTest ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={setIsNegationSpecificationTest}
                                value={isNegationSpecificationTest}
                            />
                        </View>
                        <View style={tw('flex-1 items-center')}>
                            <Text>Test de plausibilité</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#8FEE89" }}
                                thumbColor={isPlausibilityTest ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={setIsPlausibilityTest}
                                value={isPlausibilityTest}
                            />
                        </View>
                    </View>

                    <Text>Importer également toutes les phrases du texte séparément dans les différents mini-jeux</Text>

                    <Switch
                        trackColor={{ false: "#767577", true: "#8FEE89" }}
                        thumbColor={includeSentences ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setIncludeSentences}
                        value={includeSentences}
                    />
                    <TouchableOpacity
                        // @ts-ignore
                        onPress={handleCreateSubmit}
                        style={tw('px-4 py-2 bg-blue-500 text-white rounded-md mt-2')}
                    >
                        <Text style={tw('text-white')}>Créer</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {/* @ts-ignore */}
            {texts && texts.map((text: TextModel) => (
                <View key={text.id} style={tw('border p-4 mb-4 rounded')}>
                    {selectedText && selectedText.id === text.id ? (
                        <View>
                            <Text style={tw('border p-2 mb-4')}>
                                {content}
                            </Text>
                            <TextInput
                                style={tw('border p-2 mb-4')}
                                onChangeText={value => setPlausibility(Number(value))}
                                value={String(plausibility)}
                                placeholder="Plausibilité"
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={tw('border p-2 mb-4')}
                                onChangeText={setOrigin}
                                value={origin}
                                placeholder="Origine"
                            />
                            {/* TODO mettre un select picker avec les différentes origines possibles */}

                            {/* <Picker
                                selectedValue={id_theme}
                                onValueChange={(id_theme: number) => setId_theme(id_theme)}
                                style={tw('border p-2 mb-4')}
                            >
                                {themes && themes.map((theme: ThemeModel) => (
                                    <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
                                ))}
                            </Picker> */}
                            <TouchableOpacity
                                // @ts-ignore
                                onPress={handleSubmit}
                                style={tw('px-4 py-2 bg-blue-500 text-white rounded-md')}
                            >
                                <Text style={tw('text-white')}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Num:</Text> {text.num}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Contenu:</Text> {text.content}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Plausibilité: </Text>{text.test_plausibility}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Origine:</Text> {text.origin}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Theme:</Text> {themes && themes.find((theme: ThemeModel) => theme.id === text.id_theme)?.name}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Texte id:</Text> {text.id}</Text>
                            <View style={tw('flex-row justify-between')}>
                                <Button
                                    onPress={() => handleUpdate(text)}
                                    title="Modifier"
                                    color="#007BFF"
                                />
                                <Button
                                    onPress={() => handleDelete(text.id)}
                                    title="Supprimer"
                                    color="#dc3545"
                                />
                            </View>
                        </>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}
