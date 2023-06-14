import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <Auth0Provider
          domain="fsnd-stu.us.auth0.com"
          clientId="kXE4L5fWN01LCEhpFe8voA88dWs2gI1Y"
          authorizationParams={ {
              redirect_uri: window.location.origin,
              audience: "dev-showcase",
          } }
    >
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Auth0Provider>,
  document.getElementById('root'),
);