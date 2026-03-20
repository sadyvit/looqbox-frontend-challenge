import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetails } from '../hooks/usePokemon';
import { formatPokemonId, getTypeColor } from '../utils.ts';
import { PokemonSpecies } from '../types';
import { pokemonService } from '../services/pokemonService';
import { Spin, Button, Typography, Tag } from 'antd';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';
import TypeBadge from '../components/TypeBadge';

const { Text, Title } = Typography;

const Details: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetails(name || '');
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    if (pokemon) {
      pokemonService.getSpecies(pokemon.id).then(setSpecies).catch(() => setSpecies(null));
    }
  }, [pokemon]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size='large' tip="Carregando..." />;
      </div>
    )
  }

  if (error || !pokemon) {
    return (
      <div style={{ padding: 60 }}>
        <ErrorMessage message={error || 'Pokemon não encontrado'} onRetry={() => navigate('/home')} />
      </div>
    )
  }

  const primaryColor = pokemon?.types[0].type.name || 'normal';
  const color = getTypeColor(primaryColor);

  const image = shiny
    ? pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny
    : pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus || 'Unknown';

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fc' }}>
      <div style={{
        background: `linear-gradient(135deg, ${color}dd 0%, ${color} 100%)`,
        padding: '24px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '50px solid rgba(255,255,255, 0.08)',
          pointerEvents: 'none',
        }}
        />
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: '-30%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          border: '35px solid rgba(255,255,255, 0.06)',
          pointerEvents: 'none',
        }}
        />

        <Button
          onClick={() => navigate('/home')}
          icon={<ArrowLeftOutlined />}
          style={{
            marginBottom: 24,
            marginTop: 16,
            background: 'rgba(255,255,255, 0.2)',
            color: '#fff',
            fontWeight: 700,
            fontFamily: "'Nunito', sans-serif",
            border: 'none',
            borderRadius: 50,
          }}
        >
          Voltar
        </Button>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
        >
          <div >
            <Text style={{ color: 'rgba(255,255,255, 0.9)', fontSize: 13, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
              {formatPokemonId(pokemon.id)}
            </Text>
            <Title style={{
              color: '#fff',
              fontSize: 36,
              fontWeight: 900,
              fontFamily: "'Nunito', sans-serif",
              margin: '4px 0 8px',
              textTransform: 'capitalize',
              textShadow: '0px 2px 10px rgba(0,0,0,0.2)',
            }}>
              {pokemon.name}
            </Title>
            {genus && (
              <Text style={{ color: 'rgba(255,255,255, 0.9)', fontSize: 16, fontStyle: 'italic', fontFamily: "'Nunito', sans-serif" }}>
                {genus}
              </Text>
            )}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap', }}>
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
              {species?.is_legendary && <Tag color='gold' style={{ borderRadius: 20, fontWeight: 700 }}>⭐ Legendary</Tag>}
              {species?.is_mythical && <Tag color='purple' style={{ borderRadius: 20, fontWeight: 700 }}>✨ Mythical</Tag>}

            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Button
              onClick={() => setShiny(!shiny)}
              icon={<StarFilled />}
              size='small'
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: shiny ? '#FFD700' : 'rgba(255,255,255, 0.3)',
                color: shiny ? '#333' : '#fff',
                border: 'none',
                borderRadius: 50,
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                zIndex: 1,
              }}
              title={shiny ? 'Alterar para Normal' : 'Alterar para Shiny'}
            >
              {shiny ? 'Shiny' : 'Normal'}
            </Button>
            <img
              src={image || ''}
              alt={pokemon.name}
              style={{
                width: 160,
                height: 160,
                objectFit: 'contain',
                marginTop: 20,
              }}
            />
          </div>
        </div>
      </div>

    </div>
  )

}

export default Details