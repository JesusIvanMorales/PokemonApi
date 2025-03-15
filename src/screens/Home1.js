import { useNavigation } from "@react-navigation/native";
import { PokemonContext } from '../context/PokemonContext'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

const Home1 = () => {
  const navigator = useNavigation();
  const { pokemonList, setPokemonSelected } = useContext(PokemonContext);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const cambiarDePantalla = (pokemon) => {
    setPokemonSelected(pokemon);
    navigator.navigate('Home2');
  };
 
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return {
            name: pokemon.name,
            image: data.sprites.front_default,
          };
        })
      );
      setPokemonDetails(details);
    };

    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);

  useEffect(() => {
    const results = pokemonDetails.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchTerm, pokemonDetails]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon API</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pokemon Buscador"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm !== '' && (
          <View style={styles.searchResults}>
            {searchResults.map((pokemon, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.searchResultItem}  
                onPress={() => cambiarDePantalla(pokemon.name)}
              >
                <Image source={{ uri: pokemon.image }} style={styles.searchResultImage}/>
                <Text style={styles.searchResultName}>{pokemon.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchResults: {
    width: '80%',
    marginBottom: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultImage: {
    width: 50,
    height: 50,
  },
  searchResultName: {
    marginLeft: 10,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  scrollView: {
    flexGrow: 0,
  },
  pokemonCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    marginTop: 10,
    textTransform: 'capitalize',
  },
});

export default Home1