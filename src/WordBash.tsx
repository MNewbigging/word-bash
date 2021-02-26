import React from 'react';

import { observer } from 'mobx-react';

import { WBScreen } from './fixed';
import { WBGame } from './game/WBGame';
import { WBHowToPlay } from './menu/WBHowToPlay';
import { WBMenu } from './menu/WBMenu';
import { WordBashState } from './WordBashState';

import './word-bash.scss';

@observer
export class WordBash extends React.Component {
  private readonly wbState = new WordBashState();

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }

  public render() {
    let toRender: JSX.Element;
    switch (this.wbState.wbScreen) {
      case WBScreen.MENU:
        toRender = <WBMenu wbState={this.wbState} />;
        break;
      case WBScreen.GAME:
        toRender = <WBGame gameState={this.wbState.gameState} pauseGame={this.wbState.pauseGame} />;
        break;
      case WBScreen.HOW_TO_PLAY:
        toRender = <WBHowToPlay wbState={this.wbState} />;
        break;
    }

    return <div className={'word-bash'}>{toRender}</div>;
  }

  private readonly onKeyPressed = (evt: KeyboardEvent) => {
    this.wbState.pressKey(evt.key);
  };
}
