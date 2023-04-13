import React from 'react';
import HeroSection from '../components/HeroSection';
import PictureTextSection from '../components/PictureTextSection';
import team1Img from '..//components/bilder/simon.jpeg';
import team2Img from '..//components/bilder/Profilbild-Egon-Grans.jpeg';


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <PictureTextSection
        imagePosition="left"
        imageSrc={team2Img}
        title="Vår fina Egon"
        description="I sammarbete med Min Stora dag, har vi i Tenatabanken AB valt att ta in egon som designer.
        Egon är en kille på 23 år som alltid älskat kod och nu får han äntligen leva upp till sin dröm genom att 
        vara med och skapa en hemsida med några riktiga proffs. HEJA EGON"
        altText="Image description for the first section"
        />      
      <PictureTextSection
        imagePosition="right"
        imageSrc={team1Img}
        title="Simons ide"
        description="alla kan inte matte"
        altText="Image description for the second section"
      />      
    </div>
  );
};

export default Home;
