import { Image } from 'antd';
import homepageImage from '../assets/images/homepage.png';

function About() {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Image src={homepageImage} />
      </div>
      <div></div>
    </>
  );
}

export default About;
