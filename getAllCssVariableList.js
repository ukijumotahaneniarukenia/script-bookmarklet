// https://stackoverflow.com/questions/45763121/list-css-custom-properties-css-variables
var allCSS = [].slice.call(document.styleSheets).reduce(function (prev, styleSheet) {
  if (styleSheet.cssRules) {
    return (
      prev +
      [].slice.call(styleSheet.cssRules).reduce(function (prev, cssRule) {
        if (cssRule.selectorText == ':root') {
          var css = cssRule.cssText.split('{')
          css = css[1].replace('}', '').split(';')
          for (var i = 0; i < css.length; i++) {
            var prop = css[i].split(':')
            if (prop.length == 2 && prop[0].indexOf('--') == 1) {
              console.log('Property name: ', prop[0])
              console.log('Property value:', prop[1])
            }
          }
        }
      }, '')
    )
  }
}, '')

console.log(allCSS)
