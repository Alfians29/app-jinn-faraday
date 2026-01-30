import './Hero.css';

// Placeholder image - user will replace with actual photo
const PLACEHOLDER_PLAYER =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop';

function Hero({ playerName = 'FARADAY', tagline = 'STAY PLENGER!!!' }) {
  return (
    <section className='hero' id='hero'>
      <div className='hero__background'></div>

      <div className='hero__content'>
        <span className='hero__subtitle'>GTA Roleplay Player</span>

        <div className='hero__player-image'>
          <img src={PLACEHOLDER_PLAYER} alt={playerName} />
        </div>

        <h1 className='hero__title'>{playerName}</h1>

        <p className='hero__tagline'>{tagline}</p>

        <p className='hero__description'>
          Welcome to Vice City. Where every story has two sides, and every
          player has their role to play.
        </p>
      </div>

      <div className='hero__scroll-indicator'>
        <span>Scroll</span>
        <div className='hero__scroll-arrow'></div>
      </div>
    </section>
  );
}

export default Hero;
