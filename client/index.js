const fetchUrl = ''
const obj = {offset: 0}
let siteUrls = new Set()

function someFunction(myWindow = window) {
    console.log({myWindow})
    myWindow.document.querySelectorAll('a').forEach(item => {
        const href = item.getAttribute('href')
        if ((item.getAttribute('href')?.includes(window.location.origin) ||
            item.getAttribute('href')?.startsWith('/')) &&
            item.getAttribute('href')
        ) {
            siteUrls.add(href)
        }
    })

    let someArray = Array.from(siteUrls)
    someArray = someArray.splice(obj.offset)
    obj.offset = someArray.length - 1

    someArray.forEach(item => {
        const myWindow = window.open(item, '_blank')
        someFunction(myWindow)
    })
}

someFunction()


function postInformation(urls, url) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(urls),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(r => console.log(r))
        .catch(err => console.warn(err))
}

postInformation(siteUrls, fetchUrl)