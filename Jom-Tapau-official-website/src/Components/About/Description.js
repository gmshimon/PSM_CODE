import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Description = () => {
  return (
    <div>
      <Row className='row mt-5'>
        <Col className='' sm={12} md={6}>
          <img className='w-100 border rounded' src='https://i.ibb.co/xfKv5cX/IMG-9318.jpg' alt='' />
        </Col>
        <Col className='' sm={12} md={6}>
          <p className='text-danger' style={{ fontFamily: "'Ma Shan Zheng', cursive", opacity: "0.5", textAlign: "center", paddingLeft: "50px", fontSize: "100px" }}><i>About</i></p>
          <h1 style={{ textAlign: "center", color: 'grey' }}>Jom Tapau</h1>
          <p style={{ textAlign: "center", paddingRight: "50px", paddingLeft: "50px", color: "grey" }}>
            JOM TaPAU App is a Pre-order food delivery platform. It helps university students and working adults to afford cheaper food delivery meals and services
          </p>
          <i className='fs-3'>
            <p style={{textAlign: "center", color: "grey" }}>Sunday to Thursday <b className='text-danger'>10am-5pm</b></p>
          </i>
        </Col>
      </Row>

    </div>
  );
};

export default Description;