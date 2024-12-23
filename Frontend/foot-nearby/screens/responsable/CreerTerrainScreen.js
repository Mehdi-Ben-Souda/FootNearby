import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const CreerTerrainScreen = () => {
    const [nom, setNom] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [prix, setPrix] = useState('');
    const [description, setDescription] = useState('');
    const [capacite, setCapacite] = useState('');
    const [images, setImages] = useState([]);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response.assets) {
                setImages([...images, ...response.assets]);
            }
        });
    };

    const handleSubmit = () => {
        // Handle form submission
        const terrain = {
            nom,
            localisation,
            prix,
            description,
            capacite,
            images,
        };
        console.log(terrain);
        // Envoyer les données du terrain au serveur ou les traiter selon vos besoins
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                value={nom}
                onChangeText={setNom}
                placeholder="Nom du terrain"
            />
            <Text style={styles.label}>Localisation</Text>
            <TextInput
                style={styles.input}
                value={localisation}
                onChangeText={setLocalisation}
                placeholder="Localisation"
            />
            <Text style={styles.label}>Prix par heure</Text>
            <TextInput
                style={styles.input}
                value={prix}
                onChangeText={setPrix}
                placeholder="Prix par heure"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
            />
            <Text style={styles.label}>Capacité</Text>
            <TextInput
                style={styles.input}
                value={capacite}
                onChangeText={setCapacite}
                placeholder="Capacité"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Images</Text>
            <View style={styles.imageContainer}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image.uri }}
                        style={styles.image}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
                <Text style={styles.buttonText}>Choisir des photos</Text>
            </TouchableOpacity>
            <Button title="Créer le terrain" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CreerTerrainScreen;