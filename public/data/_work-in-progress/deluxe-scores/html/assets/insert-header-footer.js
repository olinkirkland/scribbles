const title = document.title

const HEADER = `<header> <strong>${title}</strong> <img src="assets/images/header-decoration.png" /> <em>by Olin Kirkland</em> </header>`
const FOOTER = `<footer> <span> This work is based on Blades in the Dark <sub>https://www.bladesinthedark.com</sub>, product of One Seven Design, developed and authored by John Harper, and licensed for our use under the Creative Commons Attribution 3.0 Unported license <sub>https://www.creativecommons.org/licenses/by/3.0</sub> </span> <span> Find more scores and scenarios by Olin Kirkland <sub>https://www.olinkirk.land/scribbles</sub> </span> </footer>`

const pages = document.querySelectorAll('.print-page')

pages[0].insertAdjacentHTML('afterbegin', HEADER)
pages.forEach((page) => {
    page.insertAdjacentHTML('beforeend', FOOTER)
})
