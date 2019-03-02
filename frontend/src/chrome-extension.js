import React from 'react';
import ReactDOM from 'react-dom';
import { iframeResizer } from 'iframe-resizer';

import App from './App';

import { ReactionsList } from 'Components';
import { classList } from 'utils';

import './Label.css';

const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

class Extension extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayComments: 'cdv',
      loading: true,
      user: null,
    };
  }

  async componentDidMount() {
    const { email, password } = this.props;

    await this.login(email, password);
    this.setState({ loading: false });
  }

  async login(email, password) {
    const res = await fetch(`https://cdv.localhost/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      mode: 'cors',
      credentials: 'include',
    });

    if (!res.ok)
      console.log('request failed: POST /api/auth/login');
    else
      this.setState({ user: await res.json() });
  }

  render() {
    const { youtubeId } = this.props;

    return (
      <div className="d-flex flex-column align-items-center">

        <div className="btn-group btn-group-lg my-4">

          <button
            className={classList('btn', this.state.displayComments === 'youtube' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'youtube' })}
          >
            Commentaires YouTube
          </button>

          <button
            className={classList('btn', this.state.displayComments === 'cdv' ? 'btn-primary' : 'btn-secondary')}
            onClick={() => this.setState({ displayComments: 'cdv' })}
          >
            Commentaires CDV
          </button>

        </div>

        { this.state.displayComments === 'youtube' ? (
          <div ref={ref => ref && ref.appendChild(this.props.youtubeComments)}></div>
        ) : (
          <iframe
            id="cdv-iframe"
            src={'https://cdv.localhost/?youtubeId=' + youtubeId}
            style={{ width: 1, minWidth: '100%' }}
            scrolling="no"
            ref={ref => iframeResizer({ checkOrigin: false }, ref)}
          />
        ) }

      </div>
    );
  }
}

const main = () => {
  const comments = document.getElementById('comments');
  const youtubeId = YOUTUBE_REGEX.exec(window.location.href);

  if (!youtubeId) {
    console.error('youtubeId not found x(');
    return;
  }

  if (!comments)
    return setTimeout(main, 100);

  const rootTag = document.createElement('div');
  const parent = comments.parentNode;

  comments.remove();
  parent.appendChild(rootTag);

  chrome.storage.local.get(['cookie'], ([cookie]) => {
    console.log('cookie', cookie);

    ReactDOM.render((
      <Extension
        youtubeId={youtubeId[1]}
        youtubeComments={comments}
      />
    ), rootTag);
  });

};

main();