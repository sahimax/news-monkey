import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import error from "../assets/404.png";
import Badge from 'react-bootstrap/Badge'


export class Newsitem extends Component {




  render() {

    let {card_title,card_des,imgurl,newsurl,author,date,source}=this.props

    return (
    
      <Card style={{ width: '18rem' }}>
      <span className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
    
  </span>

      <Card.Img variant="top" src={imgurl ? imgurl : {error} } />
      {error}
      <Card.Body>
      
        <Card.Title><h5>{card_title}</h5>
        </Card.Title>
        <Card.Text>
       {card_des}
       <small className="text-muted my-2 mx-2">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small>
        </Card.Text>
        
        <Button variant="primary" href={newsurl} target="_blank" >Go somewhere</Button>
        
      </Card.Body>
    
    </Card>

    )
  }
}

export default Newsitem
