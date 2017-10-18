function clickShow(e) {
  chrome.tabs.executeScript(null, {
    code: `
      if (document.getElementById('gridLines') != undefined)
      document.getElementById('gridLines').remove();
      var bw = innerWidth;
      var bh = innerHeight;
      var p = 0;
      var canvas = document.createElement("CANVAS");
      canvas.setAttribute('id', 'gridLines');
      canvas.setAttribute('width', String(bw));
      canvas.setAttribute('height', String(bh));
      canvas.style.setProperty('z-index', '900');
      canvas.style.setProperty('top', '0px');
      canvas.style.setProperty('left', '0px');
      canvas.style.setProperty('margin', '0px');
      canvas.style.setProperty('position', 'absolute');
      var context = canvas.getContext("2d");
      function drawBoard() {
        for (var x = 0; x <= bw; x += 8) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }  
        for (var x = 0; x <= bh; x += 8) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }        
        context.strokeStyle = "cyan";
        context.stroke();
      }
      drawBoard();
      document.body.appendChild(canvas);
    `
  });
  window.close();
}

function clickHide(e) {
  chrome.tabs.executeScript(null, {
    code: `
      if (document.getElementById('gridLines') != undefined)
      document.getElementById('gridLines').remove();    
    `
  });
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('grid-show').addEventListener('click', clickShow);
  document.getElementById('grid-hide').addEventListener('click', clickHide);
});