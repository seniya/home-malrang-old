import { Col, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import '../../assets/css/homeCal.scss';
const renderCal = () => {
  const lang = navigator.language;
  const date = new Date();
  const dayNumber = date.getDate();
  const dayName = date.toLocaleString(lang, {
    weekday: 'long',
  });
  const monthName = date.toLocaleString(lang, {
    month: 'long',
  });
  const year = date.getFullYear();

  return (
    <>
      <div className="module-dashboard">
        <div className="calendar">
          <p id="monthName">{monthName}</p>
          <p id="dayName">{dayName}</p>
          <p id="dayNumber">{dayNumber}</p>
          <p id="year">{year}</p>
        </div>
      </div>
      <div style={{ marginTop: 50, textAlign: 'right' }}>
        <Space direction="vertical">
          <Text style={{ fontSize: 12 }}>
            Calendar Design From https://codepen.io/sam_garcia2/details/yLOwGEN
          </Text>
          <Text style={{ fontSize: 12 }}>
            Calendar Design From 2 https://www.youtube.com/watch?v=kn1bNLMTgdo
          </Text>
        </Space>
        <Row>
          <Col></Col>
        </Row>
      </div>
    </>
  );
};

function homeCal() {
  return <div>{renderCal()}</div>;
}

export default homeCal;
