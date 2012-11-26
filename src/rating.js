var html = require('./template'),
    create = require('domify'),
    ev = require('event')

module.exports = function (insert) {
  var numbers = {49: 1, 50: 2, 51: 3, 52: 4, 53: 5};
  var stars = create(html).pop();
  var nodes = new Array();
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
      render(i+1)
    });
    
    ev.bind(node, 'click', function () {
      rating = i+1;
      render(i+1)
    });
  });
  
  ev.bind(stars, 'mouseout', function () {
    render(rating)
  })
  
  ev.bind(document, 'keydown', function (e) {
    if(e.target.tagName.toLowerCase() === 'input') return;
    if(!numbers[e.keyCode]) return;
    rating = numbers[e.keyCode];
    render(rating);
  })
  
  render(rating)
  return function () {
    return rating;
  };
};