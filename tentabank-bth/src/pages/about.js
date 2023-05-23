import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import team1Img from '..//components/bilder/simon.jpeg';
import team2Img from '..//components/bilder/Profilbild-Egon-Grans.jpeg';
import team3Img from '..//components/bilder/hanna.jpeg';
import styles from './about.module.css';


const About = () => {
  return (
    <div className={styles.backdrop}>
      <Container className={styles.container}>
        <Row className={styles.my_5}>
          <Col>
            <h1>Om oss</h1>
            <p>Vi är ett team av tre passionerade individer som ägnar oss åt att förbättra studieupplevelsen för universitetsstuderande.</p>
          </Col>
        </Row>
        <Row className={styles.my_5}>
          <Col md={4}>
            <div className={styles.team_member_container}>
              <div className={styles.team_member}>
                <Image src={team1Img} roundedCircle className={styles.team_member_image} />
                <h3>Simon Gottschalk</h3>
                <p>Medgrundare och VD</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.team_member_container}>
              <div className={styles.team_member}>
                <Image src={team2Img} roundedCircle className={styles.team_member_image} />
                <h3>Egon Grans</h3>
                <p>Medgrundare och teknisk chef</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.team_member_container}>
              <div className={styles.team_member}>
                <Image src={team3Img} roundedCircle className={styles.team_member_image} />
                <h3>Hanna Israelsson</h3>
                <p>Medgrundare och ekonomisk chef</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={styles.my_5}>
          <Col>
            <h2>Vårt syfte</h2>
            <p>Vårt syfte med denna produkt är att ge BTH-studenter, som är de primära användarna, en plattform där de kan dela och diskutera lösningar på tentafrågor. Målet är att uppmuntra studenters samarbete och göra det enklare för studenter att studera inför tentor genom att ge dem tillgång till en mängd olika lösningar. Alla studenter uppmuntras att använda systemet, oavsett akademisk status eller studieinriktning.</p>
          </Col>
        </Row>
        <Row className={styles.my_5}>
          <Col>
            <h2>Vår vision</h2>
            <p>Vår vision är att skapa en mer sammanhängande och inkluderande studiemiljö där alla studenter får den hjälp de behöver för att lyckas. Genom att skapa och ständigt förbättra Tentabanken strävar vi efter att bli det mest pålitliga och användarvänliga studieresurshanteringsverktyget för studenter över hela Sverige.</p>
          </Col>
        </Row>
        <Row className={styles.my_5}>
          <Col>
            <h2>Varför Tentabanken grundades</h2>
            <p>Tentabanken grundades med målet att hjälpa studenter att bättre förstå och hantera deras studiematerial. Vi såg en brist på effektiva verktyg för studenter att dela och diskutera studiematerial, särskilt när det gäller tentafrågor. Genom att skapa Tentabanken hoppas vi fylla detta tomrum och bidra till en bättre studieupplevelse för alla studenter.</p>
          </Col>
        </Row>
        <Row className={styles.my_5}>
          <Col>
            <h2>Våra tjänster</h2>
            <ul>
              <li>Personlig akademisk coaching</li>
              <li>Virtuella studiegrupper och handledning</li>
              <li>Resurser och stöd för studentlivet</li>
              <li>Karriärvägledning och förberedelse</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
