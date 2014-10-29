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

!(function(ns) {
  'use strict';

  var
    DONE_TO = 1000, // ms
    RESET_TO = 1000, // ms
    CARD_PREFIX = 'msta-card',
    ENDPOINT = "https://api.instagram.com/v1/tags/{{tag}}/media/recent",
    CLIENT_ID = 'f3a1200e40454386afcf89918e8e63c0',
    CARD_TPL = '<div data-refid="{{refid}}" class="'+ CARD_PREFIX +' flip-container"><div class="flipper"><div class="front"></div><div class="back"><img src="{{src}}" alt="{{alt}}" /></div></div></div>';

  var Game = function(domNode, level, tag) {
    this.gid = Math.floor(Math.random() * (100000000000 - 1 + 1)) + 1;
    this.gameDOM = document.createElement('div');
    this.gameDOM.id = 'game' + this.gid;
    domNode.innerHTML = '';
    domNode.appendChild(this.gameDOM);
    this.board = domNode.parentElement;
    this.points = 0;
    this.tag = tag;
    this.timeouts = {
      resetDone: null,
      resetShow: null
    };
    this.options = {
      count: level === 'easy' ? 6 : level === 'medium' ? 10 : 15,
      client_id: CLIENT_ID
    };
    this.board.style.display = 'block';
    this.board.classList.remove('done');
    this.board.classList.remove('end');
    setTimeout(function(){
      this.board.classList.add('playing');
    }.bind(this), 50);
    this.reset();
  }

  Game.prototype.checkStatus = function() {  
    var done = document.querySelectorAll('.' + CARD_PREFIX + '.done');
    if(done.length === this.options.count * 2) {
      this.reset();
      this.gameDOM.parentElement.parentElement.classList.add('done');
    }
  }

  Game.prototype.check = function(card) {
    // check whether another card has already been selected
    var selected = document.querySelectorAll('.' + CARD_PREFIX + '.selected');
    if(selected.length === 0) {
      card.classList.add('selected');
    } else if (selected[0] != card){
      // show card 
      card.classList.add('selected');
      // check if data-id is ==
      if (selected[0].dataset.refid === card.dataset.refid) {
        this.resetting = true;
        card.classList.add('memorized', 'animated', 'pulse');
        card.classList.remove('selected');
        selected[0].classList.add('memorized', 'animated', 'pulse');
        selected[0].classList.remove('selected');
        clearTimeout(this.timeouts.resetDone);
        this.timeouts.resetDone = setTimeout(function(){
          selected[0].classList.add('done');
          card.classList.add('done');
          this.checkStatus();
          this.resetting = false;
        }.bind(this), DONE_TO);
      } else {
        this.resetting = true;
        card.classList.remove('selected');
        card.classList.add('showed', 'animated', 'shake');
        selected[0].classList.remove('selected');
        selected[0].classList.add('showed', 'animated', 'shake');
        clearTimeout(this.timeouts.resetShow);
        this.timeouts.resetShow = setTimeout(function(){
          selected[0].classList.remove('showed', 'animated', 'shake');
          card.classList.remove('showed', 'animated', 'shake');
          this.resetting = false;
        }.bind(this), RESET_TO);
      }
    }
  }

  Game.prototype.ready = function(){
    this.gameDOM.parentElement.parentElement.classList.add('ready');
    this.initEvents();
  }

  Game.prototype.initEvents = function() {
    this.gameDOM.addEventListener('click', function(event){
      var parent = event.target.parentElement.parentElement;
      event.target.nodeName === 'DIV' 
        && parent.classList.contains(CARD_PREFIX) 
        && !parent.classList.contains('memorized') 
        && !this.resetting
        && this.check(parent);
    }.bind(this));
  }

  Game.prototype.initCards = function(response) {
    var data = response.data,
        url = '',
        tpl = '',
        images = [],
        loadingCount = 0,
        _this = this;

    if(typeof data === 'undefined' || data.length === 0) {
      alert('Change hash');
      this.board.style.display = 'none';
      return;
    }

    for(var i = 0, l = data.length; i < l; i++) {
      url = data[i].images.standard_resolution.url
      tpl = CARD_TPL.replace('{{src}}', url).replace('{{alt}}', CARD_PREFIX + (i+1)).replace('{{refid}}', data[i].id);
      images.push(tpl);
      images.push(tpl); // push the copy
    }
    this.gameDOM.innerHTML = images.shuffle().join('');
    [].slice.call(document.querySelectorAll('#board img')).forEach(function(img){
      img.addEventListener('load', function(){
        loadingCount++;
        (loadingCount === _this.options.count * 2) && _this.ready()
      })
    });
  }

  Game.prototype.reset = function() {
    this.resetting = false;
    this.gameDOM.parentElement.parentElement.classList.remove('ready');
  }

  Game.prototype.end = function(callback) {
    this.board.classList.remove('playing');
    this.board.classList.add('end');
    setTimeout(function(){
      this.board.style.display = 'none';
      callback.call();
    }.bind(this), 1000);
  }

  Game.prototype.play = function() {
    var url = ENDPOINT.replace('{{tag}}', this.tag) + '?count=' + this.options.count + '&client_id=' + this.options.client_id;
    jsonp(url, function(response) {
      this.initCards(response);
    }.bind(this));
    return this;
  }

  // export (window)

  ns.Game = Game;

})(window.MSTA || this);