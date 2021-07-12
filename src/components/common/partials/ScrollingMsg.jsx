import React,{useEffect} from 'react';
import $ from 'jquery';
import MovingComponent from 'react-moving-text'
import './style.scss';


const ScrollingMsg = () => {
 // Wrap every letter in a span

  return (
    <div style={{fontSize: "large"}}>
<MovingComponent type="typewriter"
  dataText={[
  'Wel-Come To Kachuwa.com',
  "Nepal's #1 Online Shopping Site",
  'Shop Online And Get Delivered On Your Doorstep',
  "Millions Of Products",
  "What Are You Waiting for",
  "Start Searching Your Favourite Products",
  "Did You Know ?",
  "We Have Image Search Integrated In Our Site",
  "Why Don't You try it Out",
  "Turn On The Camera ",
  "Via Clicking the Camera Icon",
  "Searching Has Been Made Easy",
  "Life Is So Good Kachuwa.com"

]} />
     
    </div>

  );
};

export default ScrollingMsg;
