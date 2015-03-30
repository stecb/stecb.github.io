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

//= require sweetalert
//= require_tree .
//= require ../utils

!(function() {
  'use strict';

  var hashtag = document.querySelector('#hashtag'),
      playBtn = document.querySelector('#play'),
      restartBtn = document.querySelector('#restart'),
      playAgain = document.querySelector('#playagain'),
      time = document.querySelector('#time'),
      points = document.querySelector('#points'),
      whash = window.location.hash,
      boardWrapper = document.getElementById('board-wrapper'),
      gameOptions = document.querySelector('.game-options'),
      currentGame = null,
      h = '',
      d = '',
      options = {},
      setOptions = function() {
        options.level = document.querySelector('input[type=radio]:checked').value;
        options.hash = hashtag.value.sanitize();
        options.gameOptionsDOM = gameOptions;
        options.timeDOM = time;
        options.pointsDOM = points;
      },
      newGame = function() {
        window.location.hash = options.hash + "|" + options.level;
        document.body.classList.add('loading');
        gameOptions.classList.add('out');
        playBtn.disabled = true;
        setTimeout(function() {
          gameOptions.style.display = 'none';
          currentGame = new MSTA.Game(document.getElementById('board'), options).play();
        }, 1000);
      }
  ;

  playBtn.addEventListener('click', function() {
    setOptions();
    if(options.hash !== '') {
      newGame();
    } else {
      hashtag.classList.add('animated', 'shake');
      hashtag.focus();
      setTimeout(function(){
        hashtag.classList.remove('animated', 'shake');
      }, 500);
    }
  });

  playAgain.addEventListener('click', function() {
    currentGame.playAgain();
  });

  restartBtn.addEventListener('click', function() {
    swal({   
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, restart it!",
      closeOnConfirm: true 
      }, function(){
      currentGame && currentGame.playAgain();
    });
    
  });

  hashtag.addEventListener('keyup', (function(){
    var oldValue = '';
    return function(evt) {
      oldValue !== this.value && (this.value = '#'+this.value.sanitize()) && (oldValue = this.value);
      (evt.keyCode === 13) && playBtn.click();
    }
  })());

  // new Game if whash
  if(whash !== ''){
    h = whash.split('|')[0].sanitize();
    whash.split('|')[1] && (d = whash.split('|')[1].sanitize());
    hashtag.value = '#'+h;
    d && (document.getElementById(d).checked = true);
    setOptions();
    playBtn.focus();
    // newGame();
  } else {
    hashtag.focus();
  }

  (function(d,l,s){s=d.createElement('script'),l=d.scripts[0];s.setAttribute('id','hermes_script_embed');s.setAttribute('data-ref','0.0.0.0:4567/memorysta');s.src='http://localhost:3001/assets/hermes.js';l.parentNode.insertBefore(s,l)}(document));

})();