import { useState } from 'react';
import './Characters.css';

// Placeholder images - user will replace with actual photos
const PLACEHOLDER_CHAR1 =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop';
const PLACEHOLDER_CHAR2 =
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop';

const CHARACTERS_DATA = [
  {
    id: 1,
    name: 'JASON MORALES',
    role: 'Street Hustler',
    image: PLACEHOLDER_CHAR1,
    bio: "Born and raised in the neon-lit streets of Vice City. Jason learned early that in this town, you either make your own luck or get swallowed by the tide. With quick wits and quicker hands, he's carved out a reputation as someone who gets things done — no questions asked.",
    stats: [
      { label: 'Respect', value: '87' },
      { label: 'Street Cred', value: '92' },
      { label: 'Connections', value: '45' },
    ],
  },
  {
    id: 2,
    name: 'LUCIA SANTOS',
    role: 'The Negotiator',
    image: PLACEHOLDER_CHAR2,
    bio: 'They say she can talk her way out of anything — and into even more trouble. Lucia came to Vice City with nothing but a smile and a plan. Now she runs one of the most connected networks in Leonida, proving that sometimes the pen really is mightier than the sword.',
    stats: [
      { label: 'Influence', value: '95' },
      { label: 'Loyalty', value: '78' },
      { label: 'Assets', value: '62' },
    ],
  },
];

function Characters() {
  const [activeCharacter, setActiveCharacter] = useState(0);
  const character = CHARACTERS_DATA[activeCharacter];

  return (
    <section className='characters' id='characters'>
      <div className='characters__header'>
        <h2 className='characters__title'>My Characters</h2>
        <p className='characters__subtitle'>
          Switch between roles, switch between lives
        </p>
      </div>

      <div className='characters__tabs'>
        {CHARACTERS_DATA.map((char, index) => (
          <button
            key={char.id}
            className={`characters__tab ${activeCharacter === index ? 'characters__tab--active' : ''}`}
            onClick={() => setActiveCharacter(index)}
          >
            {char.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className='characters__card' key={character.id}>
        <div className='characters__image-container'>
          <img
            src={character.image}
            alt={character.name}
            className='characters__image'
          />
        </div>

        <div className='characters__info'>
          <h3 className='characters__name'>{character.name}</h3>
          <span className='characters__role'>{character.role}</span>
          <p className='characters__bio'>{character.bio}</p>

          <div className='characters__stats'>
            {character.stats.map((stat, index) => (
              <div className='characters__stat' key={index}>
                <span className='characters__stat-value'>{stat.value}</span>
                <span className='characters__stat-label'>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Characters;
