import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import placeholder from './asset/images/previewImage.png';

const App = () => (
  <div>
    Hello World!
    <img src={placeholder} alt="images" />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
