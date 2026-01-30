import './FamilyTree.css';

// Placeholder images - user will replace with actual photos
const PLACEHOLDER_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop';

const FAMILY_DATA = {
  father: {
    name: 'Roberto Morales',
    role: 'Ayah',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
  },
  player: {
    name: 'Faraday',
    role: 'Player',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  wife: {
    name: 'Isabella',
    role: 'Istri',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  siblings: [
    {
      name: 'Diego',
      role: 'Adik Laki-laki',
      image:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    },
    {
      name: 'Sofia',
      role: 'Adik Perempuan',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
  ],
  children: [
    {
      name: 'Luna',
      role: 'Anak Pertama',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    },
    {
      name: 'Maya',
      role: 'Anak Kedua',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    },
    {
      name: 'Aria',
      role: 'Anak Ketiga',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
    },
    {
      name: 'Nova',
      role: 'Anak Keempat',
      image:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop',
    },
  ],
};

function FamilyMember({ name, role, image, isMain = false }) {
  return (
    <div
      className={`family-tree__member ${isMain ? 'family-tree__member--main' : ''}`}
    >
      <div className='family-tree__avatar'>
        <img src={image || PLACEHOLDER_AVATAR} alt={name} />
      </div>
      <span className='family-tree__member-name'>{name}</span>
      <span className='family-tree__member-role'>{role}</span>
    </div>
  );
}

function FamilyTree() {
  return (
    <section className='family-tree' id='family'>
      <div className='family-tree__header'>
        <h2 className='family-tree__title'>Family Tree</h2>
        <p className='family-tree__subtitle'>
          Blood runs thicker than the streets of Vice City
        </p>
      </div>

      <div className='family-tree__container'>
        {/* Father */}
        <div className='family-tree__level family-tree__level--parent'>
          <FamilyMember {...FAMILY_DATA.father} />
        </div>

        {/* Player & Wife */}
        <div className='family-tree__core'>
          <FamilyMember {...FAMILY_DATA.player} isMain={true} />
          <FamilyMember {...FAMILY_DATA.wife} />
        </div>

        {/* Siblings */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-2xl)' }}>
          <p className='family-tree__section-title'>Siblings</p>
          <div className='family-tree__siblings'>
            {FAMILY_DATA.siblings.map((sibling, index) => (
              <FamilyMember key={index} {...sibling} />
            ))}
          </div>
        </div>

        {/* Children */}
        <div>
          <p className='family-tree__section-title'>Children</p>
          <div className='family-tree__children'>
            {FAMILY_DATA.children.map((child, index) => (
              <FamilyMember key={index} {...child} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FamilyTree;
