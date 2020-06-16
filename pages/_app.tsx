import * as React from 'react';
import '../styles/normalize.css';
import '../styles/skeleton.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
}
