//= require_tree .

!(function() {
  'use strict';

  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };

  var
    CARD_PREFIX = 'msta-card',
    ENDPOINT = "https://api.instagram.com/v1/tags/{{tag}}/media/recent",
    CLIENT_ID = 'f3a1200e40454386afcf89918e8e63c0',
    CARD_TPL = '<div data-refid="{{refid}}" class="'+ CARD_PREFIX +'"><img src="{{src}}" alt="{{alt}}" /></div>';

  var Game = function(domNode, count, tag) {
    this.points = 0;
    this.board = domNode;
    this.tag = tag;
    this.options = {
      count: ~~(count/2),
      client_id: CLIENT_ID
    };
  }

  Game.prototype.check = function() {
    // body...
  }

  Game.prototype.initEvents = function() {
    this.board.addEventListener('click', function(event){
      var parent = null;
      if (event.target.nodeName === 'IMG') {
        parent = event.target.parentElement;
        // check whether another card has already been selected
        // otherwise just add the selected class
        parent.classList.add('selected');
      }
    });
  }

  Game.prototype.initCards = function(response) {
    var data = response.data,
        url = '',
        tpl = '',
        images = [],
        shuffledImages = [],
        loadingCount = 0,
        _this = this;
    for (var i = 0, l = data.length; i < l; i++) {
      url = data[i].images.standard_resolution.url
      tpl = CARD_TPL.replace('{{src}}', url).replace('{{alt}}', CARD_PREFIX + (i+1)).replace('{{refid}}', data[i].id);
      images.push(tpl);
      images.push(tpl); // push the copy
    }
    shuffledImages = shuffle(images);
    this.board.innerHTML = shuffledImages.join('');
    [].slice.call(document.querySelectorAll('#board img')).forEach(function(img){
      img.addEventListener('load', function(){
        loadingCount++;
        if(loadingCount === _this.options.count * 2) {
          _this.initEvents();
        }
      })
    });
  }

  Game.prototype.play = function() {
    var url = ENDPOINT.replace('{{tag}}', this.tag) + '?count=' + this.options.count + '&client_id=' + this.options.client_id;
    jsonp(url, function(response) {
      this.initCards(response);
    }.bind(this));
  }

  window.Game = Game;

  // new Game
  var g = new Game(document.getElementById('board'), 20, 'animals');

  // play game
  g.play();

})();