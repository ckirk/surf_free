console.log('surf_free loaded!');

const circleDiameter = 40
let videoFound = false
let video
let crosshair
let currentTime
let data = []
let overlay
// let time // current time of video
// let x // x coordinate of crosshair
// let y // y coordinate of crosshair

// const findCamStream = () => {
//   let cams = document.getElementsByClassName('quiver-page-rail--left')
//   let player = document.getElementById('sl-rewind-player')
//   let playerControls = document.getElementsByClassName('jw-controlbar')

//   console.log('video: ', video)
// }

const findVideo = () => {
  if (videoFound === true) {
    clearInterval(interval) // stop searching
    initTracker()
  } else {
    console.log('searching for video...')
    video = document.getElementsByClassName('jw-video')[0] //.play()
    if (video) {
      videoFound = true
      console.log('Video Found: ', video)
    }
  }
}

let interval = window.setInterval(findVideo, 1000)

const addPosition = (x, y) => {
  // data.splice(index, 0, position)
  let time = video.currentTime
  let duration = video.duration
  let percentage = time / duration

  // VIDEO HELPERS
  // video.duration
  // video.defaultPlaybackRate Sets or returns the default speed of the audio/video playback
  // playbackRate Sets or returns the speed of the audio/video playback
  // src Sets or returns the current source of the audio/video element
  // currentSrc	Returns the URL of the current audio/video

  const position = {
    x: x, 
    y: y,
    time: time
  }

  data.push(position)
  data.sort((a, b) => {
    return a.time - b.time
  })
  console.log(data)

  // create node on timeline
  const dot = document.createElement('div')
  dot.classList.add('dot')
  const timeline = document.getElementById('tkr-timeline')
  timeline.appendChild(dot)

  const timelineWidth = timeline.offsetWidth
  dot.style.setProperty('transform', `translate(${percentage * timelineWidth - 4}px, -4px)`)

  // add crosshair
  const crosshair = document.createElement('div')
  crosshair.classList.add('crosshair')
  overlay.appendChild(crosshair)
  // console.log('crosshair: ', crosshair)
  crosshair.style.setProperty('transform', `translate(${x - circleDiameter/2}px, ${y - circleDiameter/2}px)`)
}

const initTracker = () => {
  console.log('tracker initiated')
  // add eventlistner to track mouse movements
  const overlayHtml = '<div id="tkr-overlay"></div>'
  const eventCaptureHtml = '<div id="tkr-event-capture"></div>'

  // ADD HTML ELEMENTS
  // document.body.appendChild(el);
  // document.body.prepend(el2);
  // document.body.append('Text')
  // document.body.innerHTML = "<div>Text</div>";
  // insertAdjacentHTML()
  video.insertAdjacentHTML('afterend', eventCaptureHtml)
  video.insertAdjacentHTML('afterend', overlayHtml)

  const eventCapture = document.getElementById('tkr-event-capture')
  overlay = document.getElementById('tkr-overlay')

  // create element
  const crosshairHtml = '<div id="tkr-crosshair"></div>'
  overlay.innerHTML = crosshairHtml

  crosshair = document.getElementById('tkr-crosshair')
  const timelineHtml = '<div id="tkr-timeline"><div id="tkr-timeline-progress"></div></div>'
  crosshair.insertAdjacentHTML('afterend', timelineHtml)
  playhead = document.getElementById('tkr-timeline-progress')

  ////////////
  // EVENTS //
  ////////////

  // update crosshair on mouse move
  eventCapture.addEventListener('mousemove', (e) => {
    // e.stopPropagation()
    let x = e.offsetX
    let y = e.offsetY
    // console.log(x, y)
    window.requestAnimationFrame(() => {
      crosshair.style.setProperty(
        'transform',
        `translate(${x - circleDiameter / 2}px ,${y - circleDiameter / 2}px)`
      )
    })
  })

  // capture user clicks
  eventCapture.addEventListener('click', (e) => {
    // record position and time of event
    let x = e.offsetX
    let y = e.offsetY
    addPosition(x, y)
    if (video.paused) {
      video.play()
    }
  })

  // update playhead position
  video.addEventListener('timeupdate', () => {
    let progress = (video.currentTime / video.duration) * 100
    playhead.style.setProperty('width', `${progress}%`)
  })

  // find buttons (for other times)
  const buttons = document.getElementsByClassName('CameraClips_cameraClip__Wh_DL') //.play()
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      console.log('click!')
      // see if src attrubute has changed
    })
  }
}


// .play()
// .pause()
// .currentTime

// const beaconsId = '583496283421b20545c4b523'
// let year = 2023
// let month = '08'
// let day = 13
// const camPage = `https://www.surfline.com/surf-cams/beacons/${beaconsId}`
// const stillImage = `https://camstills.cdn-surfline.com/${beaconsId}/${year}/${month}/${day}/${beaconsId}.${year}${month}${day}T011215_small.jpg`
// // https://camstills.cdn-surfline.com/wc-beacons/latest_small.jpg

// const accessToken = 'cb270a7c853d30a075867a85280fcb1a0f622b1a'
// const camStream = `https://camrewinds.cdn-surfline.com/live/wc-beacons.stream.20230813T012215019.mp4?accessToken=${accessToken}`
// const liveStream = `blob:https://www.surfline.com/20605c93-05e5-4337-9de0-c0aab80b9887`

// https://camstills.cdn-surfline.com/wc-beacons/latest_small
// <video class="jw-video jw-reset" tabindex="-1" disableremoteplayback="" webkit-playsinline="" playsinline="" src="https://camrewinds.cdn-surfline.com/live/wc-beacons.stream.20230813T012215019.mp4?accessToken=cb270a7c853d30a075867a85280fcb1a0f622b1a">
// </video>

// // how often (ms) to re-run code
// var interval = 1000;
// var ctaInterval = 200
// var autoPlay = true;

// // execute every 1s - because this is a SPA react app and stuff will come back blocked if you leave and come back
// window.setInterval(cleanSurfline, interval);

// // Remove CTA even more agressively
// window.setInterval(removeCtaOverlays, ctaInterval);

// // wait a sec to find button - it doesnt load right away...
// window.setTimeout(handleBtn, interval);

// // pauses JS execution
// // debugger;

// function eventFire(el, etype){
//   if (el.fireEvent) {
//     el.fireEvent('on' + etype);
//   } else {
//     var evObj = document.createEvent('Events');
//     evObj.initEvent(etype, true, false);
//     el.dispatchEvent(evObj);
//   }
// }

// function handleCam() {
//   var cams = document.getElementsByClassName('quiver-cam-player')
//   if (cams.length > 0) {
//     var cam = cams[0]
//     // console.log('cam detected!')
//     if (document.getElementsByClassName('quiver-cam-upsell__message').length > 0) {
//       // console.log('message!')
//       if (autoPlay) {
//         window.location.reload(true)
//         // console.log(window.jwplayer())
//         // window.jwplayer().play()
//         // document.getElementsByClassName('quiver-cam-upsell__message')[0].style.display = 'none'
//       }
//     }
//   }
// }

// // Removes the overlay blocking underlying info
// function removeCtaOverlays() {

//   // list of classes for CTA divs that must be removed
//   var ctaClasses = [
//     'sl-forecast-graphs-cta',
//     'sl-forecast-table-cta'
//   ];

//   // make Surfline CTA overlay invisible (they rerender the app if you delete it)
//   for (var i = 0; i < ctaClasses.length; i++) {
//     // if there are matching nodes
//     if (document.getElementsByClassName(ctaClasses[i]).length > 0) {
//       var divsToHide = document.getElementsByClassName(ctaClasses[i])

//       // iterate over divs to hide
//       for (var i = 0; i < divsToHide.length; i++) {
//         var divToHide = divsToHide[i]
//         divToHide.style.opacity = 0;
//         divToHide.style.height = '0px'
//         divToHide.style.zIndex = '-100'
//         divToHide.innerHTML = ''
//       }
//     }
//   };
// }

// // Removes the ...--blurred classes from divs
// function unblurDivs() {

//   // list of classes marking affected blurred divs - all have '--blurred' on the end of class name
//   var blurredClasses = [
//     // 'sl-condition-day-summary__body--blurred',     // old class
//     // 'sl-forecast-graphs__wind__day--blurred',      // old class
//     // 'sl-forecast-graphs__tide__day--blurred',      // old class
//     // 'sl-forecast-graphs__weather__day--blurred',   // old class

//     'quiver-condition-day-summary__body--blurred',
//     'quiver-forecast-graphs__wind__day--blurred',
//     'quiver-forecast-graphs__tide__day--blurred',
//     'quiver-forecast-graphs__weather__day--blurred'
//   ];

//   // duplicate all blurred divs without blurred class
//   // hide blurred divs

//   // iterate over all blurred classes
//   for (var i = 0; i < blurredClasses.length; i++) {
//     // if there are divs with a blurred class
//     var divsToUnblur = document.getElementsByClassName(blurredClasses[i]); // collection of divs with particular blur class
//     // console.log('blurred class:', blurredClasses[i])
//     // console.log('divs with blurred class', divsToUnblur, 'count:', divsToUnblur.length)
//     // console.log('cloned divs', document.getElementsByClassName('clonedDiv').length)

//     if (divsToUnblur.length > 0) {

//       // iterate over all divs with class
//       for (var e = 0; e < divsToUnblur.length; e++) {
//         var divToUnblur = divsToUnblur[e]

//         // only clone divs that dont have cloned tag
//         if (!divToUnblur.dataset.cloned) {
//           var clone = divToUnblur.cloneNode(true) // clone blurred div

//           clone.classList.remove(blurredClasses[i]) // remove blur cass on clone
//           clone.classList.add('clonedDiv') // mark cloned div with new class for ID
//           // clone.style.border = '1px solid red'

//           divToUnblur.dataset.cloned = 'true' // mark cloned divs
//           divToUnblur.style.display = 'none' // hide blurred div

//           divToUnblur.parentNode.append(clone) // add cloned dive with blur class removed
//           // divToUnblur.parentNode.removeChild(divToUnblur);
//         }
//       };
//     }
//   };

//   // unblur swell table
//   if (document.getElementsByClassName('sl-forecast-table__day--blurred').length > 0) {
//     document.getElementsByClassName('sl-forecast-table__day--blurred')[0].classList.remove('sl-forecast-table__day--blurred')
//   }
// }

// // removes the faded appearance of paywalled sections
// function unShadeDivs() {

//   // list of classes for shaded divs (white fade)
//   var shadedClasses = [
//     // 'sl-day-night-shading-container--paywalled', // old class
//     'quiver-day-night-shading-container--paywalled'
//   ]

//   // only do it on graph page - not table page
//   if (document.getElementsByClassName('quiver-day-night-shading-container').length > 0) {

//     // extract good day-to-night div bkg from first non-affected div
//     var goodBkg = document.getElementsByClassName('quiver-day-night-shading-container')[0].firstChild.style.background

//     // remove all shaded classes from affected divs
//     // for each bad class
//     for (var i = 0; i < shadedClasses.length; i++) {
//       // if there are divs with that class
//       if (document.getElementsByClassName(shadedClasses[i]).length > 0) {
//         var divsToUnShade = document.getElementsByClassName(shadedClasses[i]);

//         // iterate over all divs with class
//         for (var e = 0; e < divsToUnShade.length; e++) {
//           var divToUnshade = divsToUnShade[e]
//           divToUnshade.style.zIndex = '0' // move div behind other stuff
//           divToUnshade.firstChild.style.background = goodBkg; // replace background with good background
//         };
//       }
//     };
//   }
// }

// function hourlyMode() {
//   console.log('hourly')
//   var clonedDivs = document.getElementsByClassName('clonedDiv')
//   for (var i = 0; i < clonedDivs.length; i++) {
//     var clone = clonedDivs[i]
//     clone.style.display = 'none'
//   }
// }

// // function dayMode() {
// //   console.log('17-Day')
// //   var clonedDivs = document.getElementsByClassName('clonedDiv')
// //   for (var i = 0; i < clonedDivs.length; i++) {
// //     var clone = clonedDivs[i]
// //     clone.style.display = ''
// //   }
// // }

// // handles clicking of the hourly / 17-day forcast toggle button
// function handleBtn() {
//   var viewToggleBtn = document.getElementsByClassName('sl-forecast-time-view-toggle')
//   // console.log(viewToggleBtn[0])
//   if (viewToggleBtn.length > 0) {
//     // console.log('found one!')
//     var btn = viewToggleBtn[0]
//     btn.addEventListener('click', function(e) {
//       if (!e.target.classList.contains('sl-forecast-time-view-toggle__button--active')) {
//         if (e.target.innerHTML == 'Hourly') {
//           hourlyMode()
//         } else if (e.target.innerHTML == '17-Day') {
//           // dayMode()
//           window.location.reload(true)
//         }
//       }
//       console.log('clicked!', e.target)
//     });
//   }
// }

// function cleanSurfline() {
//   console.log('cleaning!');
//   removeCtaOverlays()
//   unblurDivs()
//   unShadeDivs()
//   // handleCam()
// }
