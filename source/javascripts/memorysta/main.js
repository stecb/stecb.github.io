/**
 * Copyright (C) 2014 by Stefano Ceschi Berrini, @stecb
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

//= require_tree .
//= require ../utils

!(function() {
  'use strict';

  var hashtag = document.querySelector('#hashtag'),
      playBtn = document.querySelector('#play'),
      playAgain = document.querySelector('#playagain'),
      whash = window.location.hash.sanitize(),
      boardWrapper = document.getElementById('board-wrapper'),
      gameOptions = document.querySelector('.game-options'),
      currentGame = null,
      options = {},
      setOptions = function() {
        options.level = document.querySelector('input[type=radio]:checked').value;
        options.hash = hashtag.value.sanitize();
      },
      newGame = function() {
        gameOptions.classList.add('out');
        playBtn.disabled = true;
        setTimeout(function() {
          gameOptions.style.display = 'none';
          currentGame = new MSTA.Game(document.getElementById('board'), options.level, options.hash).play();
        }, 1000);
      }
  ;

  playBtn.addEventListener('click', function() {
    setOptions();
    if(options.hash !== '') {
      newGame();
    } else {
      hashtag.focus();
    }
  });

  playAgain.addEventListener('click', function() {
    gameOptions.style.display = 'block';
    setTimeout(function(){
      gameOptions.classList.remove('out');
    }, 50);
    currentGame.end(function(){
      playBtn.disabled = false;
    });
  });

  hashtag.addEventListener('keyup', (function(){
    var oldValue = '';
    return function() {
      oldValue !== this.value && (this.value = '#'+this.value.sanitize()) && (oldValue = this.value);
    }
  })());

  // new Game if whash
  if(whash !== ''){
    hashtag.value = '#'+whash;
    setOptions();
    newGame();
  }

})();