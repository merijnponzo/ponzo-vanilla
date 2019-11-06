//some plain javascript funnctions
//https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

export function getEach(selector, context) {
  context = context || document
  var elements = context.querySelectorAll(selector)
  return Array.prototype.slice.call(elements)
}

export function removeClass(selector, remclass) {
  var items = document.querySelectorAll('.' + selector)
  for (var i in items) {
    var item = items[i]
    if (item.nodeName) {
      item.classList.remove(remclass)
    }
  }
}
//offset element
export function getOffset(elem) {
  // crossbrowser version
  var box = elem.getBoundingClientRect()

  var body = document.body
  var docEl = document.documentElement

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  var clientTop = docEl.clientTop || body.clientTop || 0
  var clientLeft = docEl.clientLeft || body.clientLeft || 0

  var top = box.top + scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left) }
}

export function scrollBy(distance, duration) {
  var initialY = document.body.scrollTop

  var y = initialY + distance
  var baseY = (initialY + y) * 0.5
  var difference = initialY - baseY
  var startTime = performance.now()

  function step() {
    var normalizedTime = (performance.now() - startTime) / duration
    if (normalizedTime > 1) normalizedTime = 1

    window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI))
    if (normalizedTime < 1) window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}
// find any elements
export function getChild(parent, selector) {
  const foundElements = parent.querySelectorAll(selector)
  let labelElem = false
  for (let f = 0, foundlen = foundElements.length; f < foundlen; f++) {
    labelElem = foundElements[f]
  }
  return labelElem
}

export function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }
  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }
  return null
}
