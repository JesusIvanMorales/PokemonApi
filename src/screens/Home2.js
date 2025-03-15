import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { PokemonContext } from '../context/PokemonContext';

const Home2 = () => {
  const { pokemonSelected } = useContext(PokemonContext);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelected}`);
        const data = await response.json();
        setPokemonDetails(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const evolutionChain = [];
        let evoData = evolutionData.chain;
        do {
          const evoDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`);
          const evoInfo = await evoDetails.json();
          evolutionChain.push({
            name: evoData.species.name,
            image: evoInfo.sprites.front_default
          });
          evoData = evoData.evolves_to[0];
        } while (evoData && evoData.hasOwnProperty('evolves_to'));

        setEvolutions(evolutionChain);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    if (pokemonSelected) {
      fetchPokemonDetails();
    }
  }, [pokemonSelected]);

  if (!pokemonDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pokemonDetails.name.toUpperCase()}</Text>
      <Image 
        source={{ uri: pokemonDetails.sprites.front_default }} 
        style={styles.image} 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.subs}>Especificaciones:</Text>
        <Text>Height: {pokemonDetails.height / 10} m</Text>
        <Text>Weight: {pokemonDetails.weight / 10} kg</Text>
        <Text>Base Experience: {pokemonDetails.base_experience}</Text>
        
        <Text style={styles.subs}>Tipos:</Text>
        {pokemonDetails.types.map((type, index) => (
          <Text key={index}>{type.type.name}</Text>
        ))}
        
        <Text style={styles.subs}>Abilidades:</Text>
        {pokemonDetails.abilities.map((ability, index) => (
          <Text key={index}>{ability.ability.name}</Text>
        ))}
        
        <Text style={styles.subs}>Estadisticas:</Text>
        {pokemonDetails.stats.map((stat, index) => (
          <Text key={index}>{stat.stat.name}: {stat.base_stat}</Text>
        ))}
      </View>
      
      <View style={styles.evolutionContainer}>
        <Text style={styles.subs}>Evoluciones:</Text>
        <View style={styles.evolutionChain}>
          {evolutions.map((evo, index) => (
            <View key={index} style={styles.evolutionItem}>
              <Image source={{ uri: evo.image }} style={styles.evolutionImage} />
              <Text>{evo.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  subs: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  evolutionContainer: {
    marginTop: 20,
  },
  evolutionChain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  evolutionItem: {
    alignItems: 'center',
    margin: 10,
  },
  evolutionImage: {
    width: 100,
    height: 100,
  },
});

export default Home2;