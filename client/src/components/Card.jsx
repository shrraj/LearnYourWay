import React from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  return (
    <div className="card col-md-3 shift1 shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "18rem" }}>
      {props.img !== "" ?
        <img src={props.img} className="card-img-top" alt="..." /> : <div className="card-header ">{props.header}</div>}
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <Link to={props.link} className="btn btn-primary">{props.button}</Link>

      </div>
    </div>
  );
}

function Card2(props) {
  return (
    <div className="card shift1 shadow-lg p-3 mb-5 bg-white rounded c1" style={{ width: "18rem" }}>
      {props.img !== "" ?
        <img src={props.img} className="card-img-top" alt="..." /> : <div className="card-header">{props.header}</div>}
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <Link to={{ pathname: props.link, state: { mid: props.mid } }} className="btn btn-primary" >{props.button}</Link>

      </div>
    </div>
  );
}

function Card3(props) {
  return (
    <div className="card shift text-dark bg-white wid shadow-lg p-3 mb-5 rounded " style={{ width: "70%" }}>
      <div className="card-body">
        <h3 className="card-title text-center">{props.title}</h3>
        <p className="card-text ">{props.content}</p>
        <div className="text-center">
          <Link to={{ pathname: props.link, state: { mid: props.mid } }} className="btn btn-info " >{props.button}</Link>
        </div>
      </div>
    </div>
  );
}

function Card4(props) {
  return (
    <div className="card shift1 shadow-lg p-3 mb-5 bg-white rounded c1" style={{ width: "18rem" }}>
      {props.img !== "" ?
        <img src={props.img} className="card-img-top" alt="..." /> : <div className="card-header">{props.header}</div>}
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <Link to={{ pathname: props.link, state: { mid: props.mid } }} className="btn btn-primary" >{props.button}</Link>
      </div>
    </div>
  );
}

export { Card, Card2, Card3, Card4 };

