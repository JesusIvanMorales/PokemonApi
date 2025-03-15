import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'

const CallApi = () => {
  const { pokemonList } = useContext(PokemonContext);

  const renderPokemonItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <Text>Pokemon List</Text>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}

export default CallApi