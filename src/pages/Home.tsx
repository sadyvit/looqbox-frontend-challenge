import React from 'react';
import { Typography, Alert, Row, Col } from 'antd'
import SearchBar from '../components/SearchBar';
import { usePokemonSearch } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { result: searchResult, loading: searching, error: searchError, search, clear } = usePokemonSearch();

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
        <Text style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 16,
          marginBottom: 32,
          display: 'block'
        }}>
          Descubra e explore o mundo dos Pokémon!
        </Text>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar onSearch={search} onClear={clear} loading={searching} />
        </div>
      </div>

      <div style={{ margin: '0 auto', padding: '32px 24px', maxWidth: 1200 }}>
        {searchError && (
          <Alert
            message={searchError}
            type='error'
            showIcon
            closable
            onClose={clear}
            style={{ marginBottom: 24, borderRadius: 14 }}
          />
        )}

        {searchResult && !searching && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20
            }}>
              <Title level={4} style={{ margin: 0, fontFamily: "'Nunito', sans-serif" }}>
                Resultado da pesquisa
              </Title>
              <Text style={{ fontFamily: "'Nunito', sans-serif", cursor: 'pointer', color: '#EF5350', fontWeight: 700 }} onClick={clear}>
                ← Voltar para lista
              </Text>
            </div>
            <Row>
              <Col xs={12} sm={8} md={6} lg={4}>
                <PokemonCard pokemon={searchResult} />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

export default Home;