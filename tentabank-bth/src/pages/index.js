import React from 'react';
import HeroSection from '../components/HeroSection';
import PictureTextSection from '../components/PictureTextSection';
import StatisticsBar from '../components/StatisticsBar';
import Roadmap from '../components/Roadmap';
import ActiveUserSection from '../components/ActiveUserSection';
import team2Img from '..//components/images/img-11.jpg';
import team1Img from '..//components/images/img-12.jpg';


const statsData = [
  { key: 'accepted_exams', text: 'Antal accepterade Tentor' },
  { key: 'num_uni', text: 'Antal universitet' },
  { key: 'pending_exams', text: 'Väntande Tentor' },
  { key: 'users', text: 'Antal Användare' },
];


const Home = () => {
  return (
    <>
      <HeroSection/>
      <PictureTextSection
        imagePosition="left"
        imageSrc={team2Img}
        title="Tentabanken!"
        description="Välkommen till tentabanken - en innovativ plattform för högskolestudenter att enkelt dela och ladda upp sina tentor och lösningar! 
                    Vi är dedikerade till att göra dina studier enklare genom att erbjuda en omfattande samling av tentor och lösningar från olika ämnen och kurser. 
                    Med vår användarvänliga webbplats kan du enkelt ladda upp dina gamla tentor.
                    Men även sortera och hitta relevanta tentor efter kurskod, datum eller betyg för att snabbt få tillgång till det du behöver inför dina prov. 
                    Dessutom har du som användare möjlighet att ta del av andras lösningar och dra nytta av dina klasskamraters kunskap. 
                    Vi värnar om din integritet och säkerhet, och använder robusta säkerhetsåtgärder för att skydda ditt användarkonto och uppladdade material. 
                    Vårt mål är att erbjuda en pålitlig och snabb plattform. Oavsett om du är en tekniknörd eller inte, 
                    är vår användarvänliga design utformad för att göra det enkelt för alla att navigera och dra nytta av Tentabankens fördelar. 
                    Upptäck möjligheterna med Tentabanken och ta din studieupplevelse till nya höjder!"
        gray={true}
        />
      <StatisticsBar stats={statsData} /> 
      <Roadmap/>  
      <PictureTextSection
        imagePosition="right"
        imageSrc={team1Img}
        title="Vår vision"
        description="
                      Vi är tre dedikerade studenter som pluggar ofta med hjälp av gamla tentor. 
                      Vi märkte snabbt att det var svårt att hitta gamla tentor med tillhörande svar. 
                      Att ständigt be äldre studenter om deras gamla tentor var både tidskrävande och obekvämt. 
                      Vi insåg också att vi inte var de enda som hade detta problem.

                      Motiverade av dessa utmaningar beslutade vi oss för att ta tag i problemet och skapa en lösning. 
                      Vi ville skapa en plattform där studenter enkelt kan dela och ladda upp sina gamla tentor och lösningar. 
                      Genom att göra detta skulle vi underlätta för studenter att få tillgång till värdefullt studiematerial 
                      och samtidigt skapa en gemenskap där vi kan hjälpa varandra att växa och lyckas.
        
                      Vår vision är att skapa en webbplats där studenter kan hitta och dela gamla tentor på ett enkelt och smidigt sätt. 
                      Vi strävar efter att erbjuda en användarvänlig plattform där studenter kan söka efter tentor baserat på ämne, kurskod eller datum. 
                      Genom att dela våra tentor och lösningar hoppas vi att studenter runt om i världen kan dra nytta av vårt arbete och förbättra sin studieupplevelse.
        
                      Vi är stolta över att ha tagit initiativ till att lösa detta problem och ser fram emot att skapa en positiv förändring för studenter överallt. 
                      'Tillsammans kan vi göra studierna lättare och mer givande genom att dela våra kunskaper och erfarenheter. 
                      Välkomna till vår plattform där vi strävar efter att underlätta för studenter att få tillgång till värdefulla tentor och skapa en starkare studiegemenskap!
        
                    "
        altText="Image description for the second section"
        gray={true}
      />
      <ActiveUserSection/>
    </>
  );
};

export default Home;
