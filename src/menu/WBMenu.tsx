import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Drawer } from '@blueprintjs/core';

import { PoolSize } from '../fixed';
import { WordBashState } from '../WordBashState';

import './wb-menu.scss';

interface WBMenuProps {
  wbState: WordBashState;
}

@observer
export class WBMenu extends React.Component<WBMenuProps> {
  @observable private drawerOpen = false;

  public render() {
    const { wbState } = this.props;
    const toRender: JSX.Element[] = [];

    // State specific menu buttons
    wbState.pausedGame
      ? toRender.push(this.renderPauseMenu())
      : toRender.push(this.renderMainMenu());

    // Common menu buttons
    toRender.push(this.renderCommonButtons());

    // How to play drawer
    toRender.push(this.renderDrawer());

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
          onClick={() => (this.drawerOpen = !this.drawerOpen)}
        >
          HOW TO PLAY
        </button>
      </div>
    );
  }

  private renderDrawer() {
    return (
      <Drawer
        key={'drawer'}
        isOpen={this.drawerOpen}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        onClose={() => (this.drawerOpen = !this.drawerOpen)}
      >
        {this.drawerContent()}
      </Drawer>
    );
  }

  private drawerContent() {
    return (
      <div className={'drawer-content'}>
        <h2>How to play Word Bash</h2>
        <p>
          In Word Bash, you are given a pool of random letters, called tiles, which you use to make
          words.
        </p>
        <p>Choose your game size to determine how many letter tiles you want to play with.</p>
        <p>To win, you must use all the letter tiles in the pool in as many words as you like.</p>
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
