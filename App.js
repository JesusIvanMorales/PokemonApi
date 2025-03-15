import React from 'react';
import Tabs from './src/Tabs';
import { PokemonProvider } from './src/context/PokemonContext';

export default function App() {
  return (
    <PokemonProvider>
      <Tabs />
    </PokemonProvider>
  );
}