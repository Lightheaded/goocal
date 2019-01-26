const { remote, shell } = require('electron')
// const main = remote.require('./main.js');

function configureOpenRenderedLinksInDefaultBrowser() {
  const aAll = document.querySelectorAll('a')
  if (aAll && aAll.length) {
    aAll.forEach(function (a) {
      console.log('link', a);
      a.addEventListener('click', function (event) {
        if (event.target) {
          event.preventDefault()
          let link = event.target.href
          shell.openExternal(link)
        }
      })
    })
  }
}

setTimeout(function () {
  configureOpenRenderedLinksInDefaultBrowser()
}, 1000)
