import { observer } from 'mobx-react';
import React from 'react';

import { PoolSize } from '../fixed';
import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
}

@observer
export class WBMenu extends React.Component<WBMenuProps> {
  public render() {
    const { wbState } = this.props;
    const toRender: JSX.Element[] = [];

    // State specific menu buttons
    wbState.pausedGame
      ? toRender.push(this.renderPauseMenu())
      : toRender.push(this.renderMainMenu());

    // Common menu buttons
    toRender.push(this.renderCommonButtons());

    return <div className={'wb-menu'}>{toRender}</div>;
  }

  private renderMainMenu() {
    const { wbState } = this.props;
    return (
      <div key={'main'} className={'main'}>
        <form>
          <label id={'form-label'} htmlFor={'game-size'}>
            Game size:
          </label>
          <div>
            <label htmlFor={'small'}>
              <input
                type={'radio'}
                id={'small'}
                name={'size'}
                checked={wbState.gameSize === PoolSize.SMALL}
                onChange={() => wbState.setGameSize(PoolSize.SMALL)}
              />
              Small: {PoolSize.SMALL} letters
            </label>
          </div>

          <div>
            <label htmlFor={'med'}>
              <input
                type={'radio'}
                id={'med'}
                name={'size'}
                checked={wbState.gameSize === PoolSize.MEDIUM}
                onChange={() => wbState.setGameSize(PoolSize.MEDIUM)}
              />
              Medium: {PoolSize.MEDIUM} letters
            </label>
          </div>

          <div>
            <label htmlFor={'large'}>
              <input
                type={'radio'}
                id={'large'}
                name={'size'}
                checked={wbState.gameSize === PoolSize.LARGE}
                onChange={() => wbState.setGameSize(PoolSize.LARGE)}
              />
              Large: {PoolSize.LARGE} letters
            </label>
          </div>
        </form>

        <button key={'start'} className={'button'} onClick={() => wbState.startGame()}>
          START
        </button>
      </div>
    );
  }

  private renderPauseMenu() {
    const { wbState } = this.props;
    return (
      <div key={'pause'} className={'pause'}>
        <button key={'resume'} className={'button'} onClick={() => wbState.resumeGame()}>
          RESUME
        </button>

        <button key={'endgame'} className={'button'} onClick={() => wbState.endGame()}>
          END GAME
        </button>
      </div>
    );
  }

  private renderCommonButtons() {
    return (
      <div key={'common'}>
        <button
          key={'how-to'}
          className={'button'}
          onClick={() => this.props.wbState.viewHowToPlay()}
        >
          HOW TO PLAY
        </button>
      </div>
    );
  }
}
