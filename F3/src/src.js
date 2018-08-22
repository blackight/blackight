import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Carousel} from "./src-Carousel.js";

ReactDOM.render(<Carousel  fps={60} sources={["./img/01.jpg","./img/02.jpg","./img/03.jpg","./img/04.jpg","./img/05.jpg"]}/>,document.getElementById("main"));
