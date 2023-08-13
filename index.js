console.log('surf_free loaded!');

// how often (ms) to re-run code
var interval = 1000;
var ctaInterval = 200
var autoPlay = true;

// execute every 1s - because this is a SPA react app and stuff will come back blocked if you leave and come back
window.setInterval(cleanSurfline, interval);

// Remove CTA even more agressively
window.setInterval(removeCtaOverlays, ctaInterval);

// wait a sec to find button - it doesnt load right away...
window.setTimeout(handleBtn, interval);

// pauses JS execution
// debugger;

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function handleCam() {
  var cams = document.getElementsByClassName('quiver-cam-player')
  if (cams.length > 0) {
    var cam = cams[0]
    // console.log('cam detected!')
    if (document.getElementsByClassName('quiver-cam-upsell__message').length > 0) {
      // console.log('message!')
      if (autoPlay) {
        window.location.reload(true)
        // console.log(window.jwplayer())
        // window.jwplayer().play()
        // document.getElementsByClassName('quiver-cam-upsell__message')[0].style.display = 'none'
      }
    }
  }
}

// Removes the overlay blocking underlying info
function removeCtaOverlays() {

  // list of classes for CTA divs that must be removed
  var ctaClasses = [
    'sl-forecast-graphs-cta',
    'sl-forecast-table-cta'
  ];

  // make Surfline CTA overlay invisible (they rerender the app if you delete it)
  for (var i = 0; i < ctaClasses.length; i++) {
    // if there are matching nodes
    if (document.getElementsByClassName(ctaClasses[i]).length > 0) {
      var divsToHide = document.getElementsByClassName(ctaClasses[i])

      // iterate over divs to hide
      for (var i = 0; i < divsToHide.length; i++) {
        var divToHide = divsToHide[i]
        divToHide.style.opacity = 0;
        divToHide.style.height = '0px'
        divToHide.style.zIndex = '-100'
        divToHide.innerHTML = ''
      }
    }
  };
}

// Removes the ...--blurred classes from divs
function unblurDivs() {

  // list of classes marking affected blurred divs - all have '--blurred' on the end of class name
  var blurredClasses = [
    // 'sl-condition-day-summary__body--blurred',     // old class
    // 'sl-forecast-graphs__wind__day--blurred',      // old class
    // 'sl-forecast-graphs__tide__day--blurred',      // old class
    // 'sl-forecast-graphs__weather__day--blurred',   // old class

    'quiver-condition-day-summary__body--blurred',
    'quiver-forecast-graphs__wind__day--blurred',
    'quiver-forecast-graphs__tide__day--blurred',
    'quiver-forecast-graphs__weather__day--blurred'
  ];

  // duplicate all blurred divs without blurred class
  // hide blurred divs

  // iterate over all blurred classes
  for (var i = 0; i < blurredClasses.length; i++) {
    // if there are divs with a blurred class
    var divsToUnblur = document.getElementsByClassName(blurredClasses[i]); // collection of divs with particular blur class
    // console.log('blurred class:', blurredClasses[i])
    // console.log('divs with blurred class', divsToUnblur, 'count:', divsToUnblur.length)
    // console.log('cloned divs', document.getElementsByClassName('clonedDiv').length)

    if (divsToUnblur.length > 0) {

      // iterate over all divs with class
      for (var e = 0; e < divsToUnblur.length; e++) {
        var divToUnblur = divsToUnblur[e]

        // only clone divs that dont have cloned tag
        if (!divToUnblur.dataset.cloned) {
          var clone = divToUnblur.cloneNode(true) // clone blurred div

          clone.classList.remove(blurredClasses[i]) // remove blur cass on clone
          clone.classList.add('clonedDiv') // mark cloned div with new class for ID
          // clone.style.border = '1px solid red'

          divToUnblur.dataset.cloned = 'true' // mark cloned divs
          divToUnblur.style.display = 'none' // hide blurred div

          divToUnblur.parentNode.append(clone) // add cloned dive with blur class removed
          // divToUnblur.parentNode.removeChild(divToUnblur);
        }
      };
    }
  };

  // unblur swell table
  if (document.getElementsByClassName('sl-forecast-table__day--blurred').length > 0) {
    document.getElementsByClassName('sl-forecast-table__day--blurred')[0].classList.remove('sl-forecast-table__day--blurred')
  }
}

// removes the faded appearance of paywalled sections
function unShadeDivs() {

  // list of classes for shaded divs (white fade)
  var shadedClasses = [
    // 'sl-day-night-shading-container--paywalled', // old class
    'quiver-day-night-shading-container--paywalled'
  ]

  // only do it on graph page - not table page
  if (document.getElementsByClassName('quiver-day-night-shading-container').length > 0) {

    // extract good day-to-night div bkg from first non-affected div
    var goodBkg = document.getElementsByClassName('quiver-day-night-shading-container')[0].firstChild.style.background

    // remove all shaded classes from affected divs
    // for each bad class
    for (var i = 0; i < shadedClasses.length; i++) {
      // if there are divs with that class
      if (document.getElementsByClassName(shadedClasses[i]).length > 0) {
        var divsToUnShade = document.getElementsByClassName(shadedClasses[i]);

        // iterate over all divs with class
        for (var e = 0; e < divsToUnShade.length; e++) {
          var divToUnshade = divsToUnShade[e]
          divToUnshade.style.zIndex = '0' // move div behind other stuff
          divToUnshade.firstChild.style.background = goodBkg; // replace background with good background
        };
      }
    };
  }
}

function hourlyMode() {
  console.log('hourly')
  var clonedDivs = document.getElementsByClassName('clonedDiv')
  for (var i = 0; i < clonedDivs.length; i++) {
    var clone = clonedDivs[i]
    clone.style.display = 'none'
  }
}

// function dayMode() {
//   console.log('17-Day')
//   var clonedDivs = document.getElementsByClassName('clonedDiv')
//   for (var i = 0; i < clonedDivs.length; i++) {
//     var clone = clonedDivs[i]
//     clone.style.display = ''
//   }
// }

// handles clicking of the hourly / 17-day forcast toggle button
function handleBtn() {
  var viewToggleBtn = document.getElementsByClassName('sl-forecast-time-view-toggle')
  // console.log(viewToggleBtn[0])
  if (viewToggleBtn.length > 0) {
    // console.log('found one!')
    var btn = viewToggleBtn[0]
    btn.addEventListener('click', function(e) {
      if (!e.target.classList.contains('sl-forecast-time-view-toggle__button--active')) {
        if (e.target.innerHTML == 'Hourly') {
          hourlyMode()
        } else if (e.target.innerHTML == '17-Day') {
          // dayMode()
          window.location.reload(true)
        }
      }
      console.log('clicked!', e.target)
    });
  }
}

function cleanSurfline() {
  console.log('cleaning!');
  removeCtaOverlays()
  unblurDivs()
  unShadeDivs()
  // handleCam()
}
