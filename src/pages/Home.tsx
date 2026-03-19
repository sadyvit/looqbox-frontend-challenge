import React from 'react';
import { Typography } from 'antd'
import SearchBar from '../components/SearchBar';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fc' }}>
      <div style={{
        background: 'linear-gradient(135deg, #EF5350 0%, #D32F2F 60%, #B71C1C 100%)',
        padding: '48px 32px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          border: '40px solid rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: -60,
          left: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '30px solid rgba(255, 255, 255, 0.04)',
          pointerEvents: 'none'
        }} />
        <Title style={{
          color: '#fff',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 42
        }}>
          ⚡ Pokedex
        </Title>
        <Title style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14,
        }}>
          Descubra e explore o mundo dos Pokémon!
        </Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Implementar Hooks para buscar Pokémon por nome ou número, exibindo resultados em tempo real. */}
          {/* <SearchBar onSearch={() => {}} onClear={() => {}} /> */}
        </div>

      </div>
    </div>
  )
}

export default Home;