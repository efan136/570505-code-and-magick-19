'use strict';
var CLOUD_COLOR = 'white';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var POSITION_GAP = 10;
var FONT_FAM = 'PT Mono';
var FONT_SIZE = 16;
var HEADING_TEXT = ['Ура вы победили!', 'Список результатов:'];
var CLOUD_PADDING = 50;
var CONTENT_COORD_X = CLOUD_X + CLOUD_PADDING;
var TEXT_COLOR = 'black';
var COLOMN_WIDTH = 40;
var COMOMN_MARGIN_RIGHT = 50;
var MAX_HEIGHT_COLL = 150;
var USER_COLOR = 'RED';

var printText = function (ctx, arr) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_FAM;
  for (var i = 0; i < HEADING_TEXT.length; i++) {
    var headingPositionY = CLOUD_Y + (POSITION_GAP * (i + 1)) + (FONT_SIZE * (i + 1));
    ctx.fillText(arr[i], CONTENT_COORD_X, headingPositionY);
  }
};

var renderCloud = function (ctx, x, y, cloudWidth, cloudHeight, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

var printNames = function (ctx, names) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_FAM;
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i],
        CONTENT_COORD_X + (COLOMN_WIDTH * i) + (COMOMN_MARGIN_RIGHT * i),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColumnHeights = function (arr) {
  var columnHeights = [];
  for (var i = 0; i < arr.length; i++) {
    columnHeights[i] = Math.round(MAX_HEIGHT_COLL * arr[i] / getMaxElement(arr));
  }
  return columnHeights;
};

var drawColumn = function (ctx, times, names) {
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240,100%,' + (Math.random() * 100) + '%)';
    }

    ctx.beginPath();
    ctx.moveTo(CLOUD_X + CLOUD_PADDING + (COLOMN_WIDTH * i) + (COMOMN_MARGIN_RIGHT * i),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP - FONT_SIZE - POSITION_GAP);
    ctx.lineTo(CLOUD_X + CLOUD_PADDING + (COLOMN_WIDTH * i) + (COMOMN_MARGIN_RIGHT * i),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP - FONT_SIZE - POSITION_GAP - getColumnHeights(times)[i]);
    ctx.lineTo(CLOUD_X + CLOUD_PADDING + (COLOMN_WIDTH * (i + 1) + (COMOMN_MARGIN_RIGHT * i)),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP - FONT_SIZE - POSITION_GAP - getColumnHeights(times)[i]);
    ctx.lineTo(CLOUD_X + CLOUD_PADDING + (COLOMN_WIDTH * (i + 1) + (COMOMN_MARGIN_RIGHT * i)),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP - FONT_SIZE - POSITION_GAP);
    ctx.closePath();
    ctx.fill();
  }
};

var printTimes = function (ctx, times) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_FAM;
  for (var i = 0; i < times.length; i++) {
    ctx.fillText(Math.round(times[i]),
        CONTENT_COORD_X + (COLOMN_WIDTH * i) + (COMOMN_MARGIN_RIGHT * i),
        CLOUD_Y + CLOUD_HEIGHT - POSITION_GAP - FONT_SIZE - POSITION_GAP - getColumnHeights(times)[i] - POSITION_GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + POSITION_GAP,
      CLOUD_Y + POSITION_GAP, CLOUD_WIDTH,
      CLOUD_HEIGHT, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y,
      CLOUD_WIDTH, CLOUD_HEIGHT,
      CLOUD_COLOR);
  printText(ctx, HEADING_TEXT);
  printNames(ctx, names);
  getColumnHeights(times);
  drawColumn(ctx, times, names);
  printTimes(ctx, times);
};
