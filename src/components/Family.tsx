'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Particles from './Particles';
import { useLiveStatus } from '@/hooks/useLiveStatus';
import LiveBadge from './LiveBadge';
import { FAMILY, EASTER_EGG } from '@/data/familyData';

interface FamilyProps {
  wifeEasterEgg: boolean;
  setWifeEasterEgg: (value: boolean) => void;
}

export default function Family({
  wifeEasterEgg,
  setWifeEasterEgg,
}: FamilyProps) {
  const { t } = useTranslation();

  // Collect all channel IDs for live status checking
  const allChannelIds = useMemo(() => {
    const ids: (string | undefined)[] = [];
    // Add all family member channel IDs
    if (FAMILY.mainCharacter.channelId)
      ids.push(FAMILY.mainCharacter.channelId);
    if (FAMILY.wife.channelId) ids.push(FAMILY.wife.channelId);
    if (FAMILY.brother.channelId) ids.push(FAMILY.brother.channelId);
    if (FAMILY.bodyguard.channelId) ids.push(FAMILY.bodyguard.channelId);
    if (FAMILY.missingPerson.channelId)
      ids.push(FAMILY.missingPerson.channelId);
    FAMILY.sisters1.forEach((s) => s.channelId && ids.push(s.channelId));
    FAMILY.sisters2.forEach((s) => s.channelId && ids.push(s.channelId));
    FAMILY.daughters.forEach((d) => d.channelId && ids.push(d.channelId));
    FAMILY.nephews.forEach((n) => n.channelId && ids.push(n.channelId));
    if (EASTER_EGG.wife.channelId) ids.push(EASTER_EGG.wife.channelId);
    return ids;
  }, []);

  // Hook to track live status
  const { isChannelLive } = useLiveStatus(allChannelIds);

  // Helper function to get border classes based on live status
  const getLiveBorderClass = (
    channelId: string | undefined,
    normalBorder: string,
  ) => {
    if (channelId && isChannelLive(channelId)) {
      return 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3)] animate-pulse';
    }
    return normalBorder;
  };

  return (
    <>
      <div
        id='family'
        className='w-full min-h-screen bg-black py-10 md:py-16 px-4 md:px-10 lg:px-16 xl:px-24 2xl:px-32 relative'
      >
        <Particles />
        <div className='max-w-[1800px] mx-auto relative z-10'>
          {/* Section Title */}
          <div className='text-center mb-8 md:mb-12 lg:mb-14 xl:mb-16'>
            <h2 className='text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-white mb-2 md:mb-4'>
              {t('family.title1')}
            </h2>
            <h2 className='text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl text-yellow-500'>
              {t('family.title2')}
            </h2>
            <p className='mt-4 md:mt-6 text-sm md:text-base lg:text-base xl:text-base 2xl:text-xl font-[Inter] text-gray-400 max-w-2xl mx-auto px-4'>
              {t('family.description')}
            </p>
          </div>

          {/* Family Tree Grid */}
          <div className='flex flex-col items-center gap-4 md:gap-8'>
            {/* Jinn + Wife Row */}
            <div className='flex flex-row justify-center items-center gap-4 md:gap-12'>
              {/* Jinn - Main Character */}
              <div className='group relative'>
                <LiveBadge
                  isLive={isChannelLive(FAMILY.mainCharacter.channelId)}
                />
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/20 border-2 md:border-4 ${getLiveBorderClass(FAMILY.mainCharacter.channelId, 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] md:shadow-[0_0_30px_rgba(234,179,8,0.4)]')} group-hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                >
                  <img
                    src={FAMILY.mainCharacter.image}
                    alt={FAMILY.mainCharacter.name}
                    className='w-full h-full object-cover'
                  />
                  {FAMILY.mainCharacter.youtube && (
                    <a
                      href={FAMILY.mainCharacter.youtube}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                    >
                      <i className='ri-youtube-fill text-3xl md:text-5xl text-red-500 hover:scale-125 transition-transform'></i>
                    </a>
                  )}
                </div>
                <div className='text-center mt-2 md:mt-4'>
                  <h3 className='text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-bold font-[Inter]'>
                    {FAMILY.mainCharacter.name}
                  </h3>
                  <p className='text-sm md:text-base text-yellow-500 font-[Inter]'>
                    {t('family.roles.mainCharacter')}
                  </p>
                </div>
              </div>

              {/* Heart connector */}
              <div className='text-yellow-500 text-2xl md:text-4xl'>❤</div>

              {/* Wife */}
              <div className='group relative'>
                <LiveBadge
                  isLive={isChannelLive(
                    wifeEasterEgg
                      ? EASTER_EGG.wife.channelId
                      : FAMILY.wife.channelId,
                  )}
                />
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-600/20 border-2 md:border-4 ${getLiveBorderClass(wifeEasterEgg ? EASTER_EGG.wife.channelId : FAMILY.wife.channelId, 'border-pink-500/50 group-hover:border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] md:shadow-[0_0_20px_rgba(236,72,153,0.3)]')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                >
                  <img
                    src={
                      wifeEasterEgg ? EASTER_EGG.wife.image : FAMILY.wife.image
                    }
                    alt={
                      wifeEasterEgg ? EASTER_EGG.wife.name : FAMILY.wife.name
                    }
                    className='w-full h-full object-cover'
                  />
                  <a
                    href={
                      wifeEasterEgg
                        ? EASTER_EGG.wife.youtube
                        : FAMILY.wife.youtube
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                  >
                    <i className='ri-youtube-fill text-3xl md:text-5xl text-red-500 hover:scale-125 transition-transform'></i>
                  </a>
                </div>
                <div className='text-center mt-2 md:mt-4'>
                  <h3
                    className='text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-white font-bold font-[Inter] cursor-pointer hover:text-pink-400 transition-colors'
                    onClick={() => setWifeEasterEgg(!wifeEasterEgg)}
                  >
                    {wifeEasterEgg ? EASTER_EGG.wife.name : FAMILY.wife.name}
                  </h3>
                  <p className='text-sm md:text-base text-pink-500 font-[Inter]'>
                    {wifeEasterEgg
                      ? t('family.roles.sweetheart')
                      : t('family.roles.wife')}
                  </p>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className='w-1 h-4 md:h-8 bg-yellow-500/50'></div>

            {/* Siblings Label */}
            <div className='text-center'>
              <h3 className='text-lg md:text-2xl text-gray-400 font-[Inter]'>
                {t('family.roles.siblings')}
              </h3>
            </div>

            {/* Brother + Sisters Row */}
            <div className='flex justify-center gap-3 md:gap-6 flex-wrap max-w-[380px] md:max-w-[700px] items-end mx-auto'>
              {/* Brother */}
              <div className='group relative'>
                <LiveBadge isLive={isChannelLive(FAMILY.brother.channelId)} />
                <div
                  className={`w-20 h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 md:border-4 ${getLiveBorderClass(FAMILY.brother.channelId, 'border-blue-500/30 group-hover:border-blue-500')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                >
                  <img
                    src={FAMILY.brother.image}
                    alt={FAMILY.brother.name}
                    className='w-full h-full object-cover'
                  />
                  {FAMILY.brother.youtube && (
                    <a
                      href={FAMILY.brother.youtube}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                    >
                      <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                    </a>
                  )}
                </div>
                <div className='text-center mt-2 md:mt-3'>
                  <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                    {FAMILY.brother.name}
                  </h3>
                  <p className='text-blue-500 font-[Inter] text-[10px] md:text-xs'>
                    {t('family.roles.brother')}
                  </p>
                </div>
              </div>

              {/* Sisters */}
              {FAMILY.sisters1.map((sister, index) => (
                <div key={index} className='group relative'>
                  <LiveBadge isLive={isChannelLive(sister.channelId)} />
                  <div
                    className={`w-20 h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 md:border-4 ${getLiveBorderClass(sister.channelId, 'border-white/30 group-hover:border-yellow-500')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                  >
                    <img
                      src={sister.image}
                      alt={sister.name}
                      className='w-full h-full object-cover'
                    />
                    {sister.youtube && (
                      <a
                        href={sister.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                      >
                        <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                      </a>
                    )}
                  </div>
                  <div className='text-center mt-2 md:mt-3'>
                    <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                      {sister.name}
                    </h3>
                    <p className='text-gray-500 font-[Inter] text-[10px] md:text-xs'>
                      {t('family.roles.sister')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sisters Row 2 */}
            <div className='flex justify-center gap-3 md:gap-6 flex-wrap max-w-[380px] md:max-w-[1000px] mt-2 md:mt-4 mx-auto'>
              {FAMILY.sisters2.map((sister, index) => (
                <div key={index} className='group relative'>
                  <LiveBadge isLive={isChannelLive(sister.channelId)} />
                  <div
                    className={`w-20 h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 md:border-4 ${getLiveBorderClass(sister.channelId, 'border-white/30 group-hover:border-yellow-500')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                  >
                    <img
                      src={sister.image}
                      alt={sister.name}
                      className='w-full h-full object-cover'
                    />
                    {sister.youtube && (
                      <a
                        href={sister.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                      >
                        <i className='ri-youtube-fill text-xl md:text-3xl text-red-500 hover:scale-125 transition-transform'></i>
                      </a>
                    )}
                  </div>
                  <div className='text-center mt-2 md:mt-3'>
                    <h3 className='text-xs md:text-sm text-white font-bold font-[Inter]'>
                      {sister.name}
                    </h3>
                    <p className='text-gray-500 font-[Inter] text-[10px] md:text-xs'>
                      {t('family.roles.sister')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Connector Line */}
            <div className='w-1 h-4 md:h-8 bg-yellow-500/50'></div>

            {/* Children Label */}
            <div className='text-center'>
              <h3 className='text-lg md:text-2xl text-gray-400 font-[Inter]'>
                {t('family.roles.children')}
              </h3>
            </div>

            {/* Children Row (Daughters + Nephew) */}
            <div className='flex justify-center gap-4 md:gap-8 flex-wrap max-w-[380px] md:max-w-none mx-auto'>
              {/* Daughters */}
              {FAMILY.daughters.map((daughter, index) => (
                <div key={`daughter-${index}`} className='group relative'>
                  <LiveBadge isLive={isChannelLive(daughter.channelId)} />
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-pink-400/20 to-pink-500/10 border-2 md:border-4 ${getLiveBorderClass(daughter.channelId, 'border-pink-400/30 group-hover:border-pink-400')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                  >
                    <img
                      src={daughter.image}
                      alt={daughter.name}
                      className='w-full h-full object-cover'
                    />
                    {daughter.youtube && (
                      <a
                        href={daughter.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                      >
                        <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                      </a>
                    )}
                  </div>
                  <div className='text-center mt-2 md:mt-3'>
                    <h3 className='text-xs md:text-sm lg:text-base text-white font-bold font-[Inter]'>
                      {daughter.name}
                    </h3>
                    <p className='text-pink-400 font-[Inter] text-[10px] md:text-xs'>
                      {t('family.roles.daughter')}
                    </p>
                  </div>
                </div>
              ))}
              {/* Nephews */}
              {FAMILY.nephews.map((nephew, index) => (
                <div key={`nephew-${index}`} className='group relative'>
                  <LiveBadge isLive={isChannelLive(nephew.channelId)} />
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-500/10 border-2 md:border-4 ${getLiveBorderClass(nephew.channelId, 'border-amber-400/30 group-hover:border-amber-400')} transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
                  >
                    <img
                      src={nephew.image}
                      alt={nephew.name}
                      className='w-full h-full object-cover'
                    />
                    {nephew.youtube && (
                      <a
                        href={nephew.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                      >
                        <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                      </a>
                    )}
                  </div>
                  <div className='text-center mt-2 md:mt-3'>
                    <h3 className='text-xs md:text-sm lg:text-base text-white font-bold font-[Inter]'>
                      {nephew.name}
                    </h3>
                    <p className='text-amber-400 font-[Inter] text-[10px] md:text-xs'>
                      {t('family.roles.nephew')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Missing Person & Bodyguard Section */}
            <div className='w-full pt-8 md:pt-12'>
              <div className='max-w-[900px] mx-auto flex flex-col md:flex-row gap-6 justify-center'>
                {/* Bodyguard Card */}
                <div className='flex-1 max-w-[400px] family-card'>
                  <div className='bg-gradient-to-b from-green-950/30 to-black border-2 border-green-500/50 rounded-lg p-4 md:p-6 relative overflow-hidden h-full'>
                    {/* Shield banner */}
                    <div className='absolute -left-10 top-4 w-[120%] h-6 bg-green-600 transform -rotate-3 flex items-center justify-center z-10'>
                      <p className='text-white font-bold text-xs tracking-widest whitespace-nowrap'>
                        | {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |{' '}
                        {t('family.roles.bodyguard').toUpperCase()} |
                      </p>
                    </div>

                    <div className='mt-8 flex flex-col items-center'>
                      {/* Photo placeholder */}
                      <div className='group relative'>
                        {/* Live Badge for rectangular card */}
                        {isChannelLive(FAMILY.bodyguard.channelId) && (
                          <div className='absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full shadow-lg animate-pulse'>
                            <span className='w-2 h-2 bg-white rounded-full animate-ping'></span>
                            <span className='text-white text-[10px] md:text-xs font-bold uppercase tracking-wider'>
                              LIVE
                            </span>
                          </div>
                        )}
                        <div
                          className={`w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gradient-to-br from-green-900/50 to-green-950 border-4 ${isChannelLive(FAMILY.bodyguard.channelId) ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3)] animate-pulse' : 'border-green-600/50 group-hover:border-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]'} flex items-center justify-center relative overflow-hidden transition-all duration-300`}
                        >
                          <img
                            src={FAMILY.bodyguard.image}
                            alt={FAMILY.bodyguard.name}
                            className='w-full h-full object-cover'
                          />
                          {FAMILY.bodyguard.youtube && (
                            <a
                              href={FAMILY.bodyguard.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name and details */}
                      <div className='text-center mt-4'>
                        <h3 className='text-xl md:text-2xl text-green-500 font-bold font-[Inter]'>
                          {FAMILY.bodyguard.name}
                        </h3>
                        <p className='text-gray-400 font-[Inter] text-sm mt-1'>
                          {t('family.roles.bodyguard')}
                        </p>
                        <p className='text-green-400/70 font-[Inter] text-xs mt-2 italic'>
                          &quot;Always on duty&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Missing Person Card */}
                <div className='flex-1 max-w-[400px] family-card'>
                  <div className='bg-gradient-to-b from-red-950/30 to-black border-2 border-red-500/50 rounded-lg p-4 md:p-6 relative overflow-hidden h-full'>
                    {/* Police tape effect */}
                    <div className='absolute -left-10 top-4 w-[120%] h-6 bg-yellow-500 transform -rotate-3 flex items-center justify-center z-10'>
                      <p className='text-black font-bold text-xs tracking-widest whitespace-nowrap'>
                        | {t('family.roles.missing')} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing').toUpperCase()} |{' '}
                        {t('family.roles.missing')} |
                      </p>
                    </div>

                    <div className='mt-8 flex flex-col items-center'>
                      {/* Photo placeholder */}
                      <div className='group relative'>
                        {/* Live Badge for rectangular card */}
                        {isChannelLive(FAMILY.missingPerson.channelId) && (
                          <div className='absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full shadow-lg animate-pulse'>
                            <span className='w-2 h-2 bg-white rounded-full animate-ping'></span>
                            <span className='text-white text-[10px] md:text-xs font-bold uppercase tracking-wider'>
                              LIVE
                            </span>
                          </div>
                        )}
                        <div
                          className={`w-24 h-24 md:w-28 md:h-28 rounded-lg bg-gradient-to-br from-red-900/50 to-red-950 border-4 ${isChannelLive(FAMILY.missingPerson.channelId) ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3)] animate-pulse' : 'border-red-600/50 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'} flex items-center justify-center relative overflow-hidden transition-all duration-300`}
                        >
                          <img
                            src={FAMILY.missingPerson.image}
                            alt={FAMILY.missingPerson.name}
                            className='w-full h-full object-cover'
                          />
                          {FAMILY.missingPerson.youtube && (
                            <a
                              href={FAMILY.missingPerson.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'
                            >
                              <i className='ri-youtube-fill text-2xl md:text-4xl text-red-500 hover:scale-125 transition-transform'></i>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name and details */}
                      <div className='text-center mt-4'>
                        <h3 className='text-xl md:text-2xl text-red-500 font-bold font-[Inter]'>
                          {FAMILY.missingPerson.name}
                        </h3>
                        <p className='text-gray-400 font-[Inter] text-sm mt-1'>
                          {t('family.roles.father')}
                        </p>
                        <p className='text-red-400/70 font-[Inter] text-xs mt-2 italic'>
                          &quot;Last seen: Unknown&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
