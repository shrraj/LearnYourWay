import React from 'react';
import '../../index.css';
import frontend from '../images/frontend.png';
import backend from '../images/backend.png';
import img3 from '../images/img3.png';
import { Card } from '../Card';

function FrontPage() {
  window.alert("Use desktop for better experience");
  return (
    <div className="container-fluid">
      <div className='container-fluid row home'>
        <h2 className='txtCol col-md-3 detailHeading '><strong>Place to learn Web Development from anywhere and at any time</strong></h2>
        <img src={img3} className='col-md-5'></img>
      </div>
      <div style={{ marginBottom: '10%' }}>
        <h1 className='ekaur'><strong>Start your Web Development Journey with us.</strong></h1>

        <div className="row">
          <Card title="Prepare For Frontend Development"
            content="Popular Goals: html,CSS and Bootstrap"
            img={frontend}
            button="Get Started"
            link='/home'
          />
          <Card title="Prepare For Backend Development"
            content="Popular Goals: Node JS, MongoDB"
            img={backend}
            button="Get Started"
            link='/home'
          />
        </div>
      </div>
    </div>
  );
}

export default FrontPage;