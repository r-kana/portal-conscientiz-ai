$(function() {
  carouselInit()
  $("#carousel-btn-prev").on('click', () => { slideLeft() })
  $("#carousel-btn-next").on('click', () => { slideRight() })
});

var windowItemsOffset;

function carouselInit() {
  let carouselItemLength = $('#carousel-inner').children().length;
  let itemWidth = $('#carousel-inner').children()[0].offsetWidth;
  let carouselWidth = $('#carousel-inner').prop("scrollWidth");
  let windowWidth = $('#carousel-inner').prop("offsetWidth");
  let gapWidth = (carouselWidth - (itemWidth * carouselItemLength)) / (carouselItemLength-1);
  let itemsOnWindow = Math.floor(windowWidth/(itemWidth + gapWidth));

  windowItemsOffset = (itemWidth + gapWidth) * itemsOnWindow;
}

var windowMoveOffset = 0;

function slideRight() {
  $('#carousel-inner')[0].scrollLeft += (windowItemsOffset);
}

function slideLeft() {
  $('#carousel-inner')[0].scrollLeft -= (windowItemsOffset);
}