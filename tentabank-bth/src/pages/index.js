import React from 'react';
import HeroSection from '../components/HeroSection';
import PictureTextSection from '../components/PictureTextSection';
import team1Img from '..//components/bilder/simon.jpeg';
import team2Img from '..//components/bilder/Profilbild-Egon-Grans.jpeg';
import StatisticsBar from '../components/StatisticsBar';
import Roadmap from '../components/Roadmap';
import ActiveUserSection from '../components/ActiveUserSection';


const statsData = [
  { key: 'accepted_exams', text: 'Accepted Exams' },
  { key: 'pending_exams', text: 'Pending Exams' },
  { key: 'denied_exams', text: 'Denied Exams' },
  { key: 'users', text: 'Users' },
];


const Home = () => {
  return (
    <>
      <HeroSection/>
      <PictureTextSection
        imagePosition="left"
        imageSrc={team2Img}
        title="Vad är Tentabanken?"
        description="I samarbete med Min Stora dag, har vi hos Tentabanken AB valt att ta in Egon som designer.
        Egon är en kille på 23 år som alltid älskat kod och nu får han äntligen leva upp till sin dröm genom att 
        vara med och skapa en hemsida med några riktiga proffs. HEJA EGON"
        altText="Image description for the first section"
        gray={true}
        />
      <StatisticsBar stats={statsData} /> 
      <Roadmap/>  
      <PictureTextSection
        imagePosition="right"
        imageSrc={team1Img}
        title="Simons ide"
        description="Alla kan inte matte"
        altText="Image description for the second section"
        gray={true}
      />
      <ActiveUserSection/>
    </>
  );
};

export default Home;
