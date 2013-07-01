var html = require('./template'),
    create = require('domify'),
    ev = require('event')

module.exports = function (insert) {
  var numbers = {49: 1, 50: 2, 51: 3, 52: 4, 53: 5};
  var stars = create(html);
  var nodes = new Array();
  var enabled = true;
  var rating = 1;
  
  var render = function (i) {
    nodes.forEach(function (node, y) {
      if(y<i) node.innerHTML = '&#9733;';
      else node.innerHTML = '&#9734;';
    });
  };
  
  insert(stars);
  
  Array.prototype.forEach.call(stars.childNodes, function (node, i) {
    nodes.push(node);
    
    ev.bind(node, 'mouseover', function () {
      if(!enabled) return;
      render(i+1);
    });
    
    ev.bind(node, 'click', function () {
      if(!enabled) return;
      rating = i+1;
      render(i+1);
    });
  });
  
  ev.bind(stars, 'mouseout', function () {
    if(!enabled) return;
    render(rating);
  });
  
  ev.bind(document, 'keydown', function (e) {
    if(!enabled) return;
    var tag = e.target.tagName.toLowerCase();
    if(tag === 'input' || tag === 'textarea') return;
    if(!numbers[e.keyCode]) return;
    rating = numbers[e.keyCode];
    render(rating);
  });
  
  render(rating);

  var returns = function () {
    return rating;
  };

  returns.disable = function () {
    enabled = false;
  };

  returns.enable = function () {
    enabled = true;
  };

  return returns;
};