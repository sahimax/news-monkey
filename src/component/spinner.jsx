import React, { Component } from 'react';
import loading from "../assets/spinner.gif"

export default class spinner extends Component {
  render() {
    return (
        <>
     <div className="text-center my-3 ">
     <img src={loading} className='spinner' alt="loading" srcSet="" width={100} height={100}/>
     </div>
     
      </>
    )
  }
}
