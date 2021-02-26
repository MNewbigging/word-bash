import { observer } from 'mobx-react';
import React from 'react';
import { WordBashState } from '../WordBashState';

import './how-to-play.scss';
import './wb-menu.scss';

interface HTPProps {
  wbState: WordBashState;
}

@observer
export class WBHowToPlay extends React.PureComponent<HTPProps> {
  public render() {
    return (
      <div className={'how-to-play'}>
        {this.drawerContent()}
        <button key={'back-btn'} className={'button'} onClick={() => this.props.wbState.viewMenu()}>
          BACK
        </button>
      </div>
    );
  }

  private drawerContent() {
    return (
      <div className={'drawer-content'}>
        <h2>How to play Word Bash</h2>
        <p>In Word Bash, you are given a pool of random letters which you use to make words.</p>
        <p>Choose your game size to determine how many letter tiles you want to play with.</p>
        <p>To win, you must use all the letter tiles in the pool.</p>
        <p>You cannot use the same word twice; each word accepted must be unique.</p>
        <p>
          Click on a word you have already accepted to remove it and return those letters to the
          pool.
        </p>
        <p>
          You are awarded points based on the length of your accepted words - try to get as many
          long words as you can!
        </p>
      </div>
    );
  }
}
