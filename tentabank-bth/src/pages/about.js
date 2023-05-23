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
          <p>We are a team of three passionate individuals dedicated to improving the college experience for students.</p>
        </Col>
      </Row>
      <Row className={styles.my_5}>
        <Col md={4}>
          <div className={styles.team_member_container}>
            <div className={styles.team_member}>
              <Image src={team1Img} roundedCircle className={styles.team_member_image} />
              <h3>Simon Gottschalk</h3>
              <p>Co-founder and CEO</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.team_member_container}>
            <div className={styles.team_member}>
              <Image src={team2Img} roundedCircle className={styles.team_member_image} />
              <h3>Egon Grans</h3>
              <p>Co-founder and CTO</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className={styles.team_member_container}>
            <div className={styles.team_member}>
              <Image src={team3Img} roundedCircle className={styles.team_member_image} />
              <h3>Hanna Israelsson</h3>
              <p>Co-founder and CFO</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className={styles.my_5}>
        <Col>
          <h2>Our Purpose</h2>
          <p>
            This products purpose is to provide BTH students, who are the primary users,
             with a platform where they can share and discuss exam solutions. The goal is to encourage student 
             collaboration and make it simpler for students to study for exams by providing them with access to a variety of solutions. 
             This will be made with the help of the secondary user, which is a BTH employee who will review the exams before 
             publishing them to ensure rightfully uploaded material. Regardless of academic standing or field of study, all students are 
             encouraged to use the system. Students and the educational institutions they attend are the main stakeholders. 
             With the Tentabank-application students it will be possible to sort exams by course code, date, and 
             rating, upload and share exam solutions, and store exams on Google Cloud Storage..</p>
        </Col>
      </Row>
      <Row className={styles.my_5}>
        <Col>
          <h2>Our Services</h2>
          <ul>
            <li>Personalized academic coaching</li>
            <li>Virtual study groups and tutoring</li>
            <li>College life resources and support</li>
            <li>Career guidance and preparation</li>
          </ul>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default About;
