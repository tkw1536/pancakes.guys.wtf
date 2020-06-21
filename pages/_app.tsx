import * as React from 'react';
import '../styles/normalize.css';
import '../styles/skeleton.css'

export default function MyApp({ Component, pageProps }) {
  return (<>
    <div className="container">
      <Component {...pageProps} />
    </div>
    <small style={{
      "position": "absolute",
      "marginBottom": 5,
      "marginRight": 5,
      bottom: 0,
      right: 0,
    }}>
      For legal reasons I must also link <a href="https://inform.everyone.wtf/" target="_blank" style={{color: 'blue'}}>my Privacy Policy and Imprint</a>.
    </small>
  </>);
}
