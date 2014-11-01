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
    TWITTER_SHARE_TEXT = "I played #MemorYsta (#{{h}}) and scored {{points}} points in {{time}}!! Can you beat me?",
    DONE_TO = 1000, // ms
    RESET_TO = 1000, // ms
    CARD_PREFIX = 'msta-card',
    ENDPOINT = "https://api.instagram.com/v1/tags/{{tag}}/media/recent",
    CLIENT_ID = 'f3a1200e40454386afcf89918e8e63c0',
    CARD_TPL = '<div data-refid="{{refid}}" class="'+ CARD_PREFIX +' flip-container"><div class="flipper"><div class="front"></div><div class="back"><img src="{{src}}" alt="{{alt}}" /></div></div></div>'
  ;

  var Game = function(domNode, options) {
    this.gid = Math.floor(Math.random() * (100000000000 - 1 + 1)) + 1;
    this.gameDOM = document.createElement('div');
    this.gameDOM.id = 'game' + this.gid;
    this.gameOptionsDOM = options.gameOptionsDOM;
    domNode.innerHTML = '';
    domNode.appendChild(this.gameDOM);
    this.board = domNode.parentElement;
    this.points = 0;
    this.tag = options.hash;
    this.timeouts = {
      resetDone: null,
      resetShow: null,
      timer: null
    };
    this.options = {
      count: options.level === 'easy' ? 6 : options.level === 'medium' ? 10 : 15,
      client_id: CLIENT_ID
    };
    this.DOM = {
      time: options.timeDOM,
      points: options.pointsDOM
    }
    document.getElementById('tag-placeholder').innerHTML = '<small>#' + this.tag + '</small>';
    this.board.style.display = 'block';
    document.body.classList.remove('won');
    document.body.classList.remove('end');
    
    setTimeout(function(){
      document.body.classList.add('playing');
    }.bind(this), 50);
  }

  Game.prototype.won = function() {
    var txt = TWITTER_SHARE_TEXT
      .replace('{{points}}', this.points)
      .replace('{{time}}', this.DOM.time.innerHTML)
      .replace('{{h}}', this.tag.slice(0,30))
    document.getElementById('tw-share-placeholder').innerHTML = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="'+txt+'" data-url="'+'http://stecb.ninja/memorysta'+window.location.hash+'" data-count="none">Tweet</a>';
    twttr.widgets.load();
    clearInterval(this.timeouts.timer);
    this.reset();
    document.body.classList.add('won');
  }

  Game.prototype.checkStatus = function() {  
    var done = document.querySelectorAll('.' + CARD_PREFIX + '.done');
    (done.length === this.options.count * 2) && this.won();
  }

  Game.prototype.check = function(card) {
    // check whether another card has already been selected
    var selected = document.querySelectorAll('.' + CARD_PREFIX + '.selected');
    if(selected.length === 0) {
      card.classList.add('selected');
      card.dataset.visited = true;
    } else if (selected[0] != card){
      // show card 
      card.classList.add('selected');
      // check if data-id is ==
      if (selected[0].dataset.refid === card.dataset.refid) {
        this.setPoints('equal');
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
        card.dataset.visited && this.setPoints('not_equal');
        this.resetting = true;
        card.classList.remove('selected');
        card.classList.add('showed', 'animated', 'shake');
        selected[0].classList.remove('selected');
        selected[0].classList.add('showed', 'animated', 'shake');
        card.dataset.visited = true;
        clearTimeout(this.timeouts.resetShow);
        this.timeouts.resetShow = setTimeout(function(){
          selected[0].classList.remove('showed', 'animated', 'shake');
          card.classList.remove('showed', 'animated', 'shake');
          this.resetting = false;
        }.bind(this), RESET_TO);
      }
    }
  }

  Game.prototype.setPoints = function(what) {
    var points = 0,
        pointElement = document.createElement('div');
    switch(what) {
      case "equal" : 
        points = 5;
      break;
      case "not_equal" :
        points = -2;
      break;
    }
    pointElement.classList.add('point-element', 'animated', 'fadeInUp');
    points > 0 && pointElement.classList.add('plus');
    pointElement.innerHTML = points;
    document.body.appendChild(pointElement);
    setTimeout(function() {
      pointElement.classList.remove('animated', 'fadeInUp');
      setTimeout(function(){
        pointElement.classList.add('animated', 'fadeOutUp');
        setTimeout(function(){
          pointElement.parentElement.removeChild(pointElement);
        }, 1000);
      }, 500)
    }, 1000)
    this.points = (this.points + points);
    this.DOM.points.innerHTML = this.points;
  }

  Game.prototype.startTimer = function() {
    var elapsed = 1,
        mins = 0,
        sec = 0;
    this.timeouts.timer = setInterval(function(){
      mins = ~~(elapsed / 60);
      sec = elapsed % 60;
      this.DOM.time.innerHTML = (mins < 10 ? '0' + mins : mins) + ":" + (sec < 10 ? '0' + sec : sec);
      elapsed ++;
    }.bind(this), 1000);
  }

  Game.prototype.ready = function(){
    document.body.classList.remove('loading');
    document.body.classList.add('ready');
    this.initEvents();
    this.startTimer();
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
    var data = response.data ? response.data.slice(0, this.options.count) : undefined,
        url = '',
        tpl = '',
        images = [],
        loadingCount = 0,
        _this = this;

    if(typeof data === 'undefined' || data.length === 0 || data.length < this.options.count) {
      swal({title: 'please change hash!'});
      this.playAgain();
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
    document.body.classList.remove('ready', 'loading');
  }

  Game.prototype.end = function(callback) {
    clearInterval(this.timeouts.timer);
    this.DOM.time.innerHTML = '00:00';
    this.DOM.points.innerHTML = '0';
    document.getElementById('tag-placeholder').innerHTML = '';
    document.body.classList.remove('playing', 'loading');
    document.body.classList.add('end');
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

  Game.prototype.playAgain = function() {
    document.body.classList.remove('won');
    this.gameOptionsDOM.style.display = 'block';
    setTimeout(function(){
      this.gameOptionsDOM.classList.remove('out');
    }.bind(this), 50);
    this.end(function(){
      document.querySelector('#hashtag').focus();
      document.querySelector('#play').disabled = false;
    });
  }

  // export (window)

  ns.Game = Game;

})(window.MSTA || this);