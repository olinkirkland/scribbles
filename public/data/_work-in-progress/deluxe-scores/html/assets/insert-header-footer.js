const title = document.title

const HEADER = `<header> <strong>${title}</strong> <img src="assets/images/decoration-2.svg" /> <strong>by Olin Kirkland</strong> </header>`
const FOOTER =
    `<footer> <span> This work is based on <a href="https://www.bladesinthedark.com">Blades in the Dark</a>, a product of One&nbsp;Seven&nbsp;Design, <br />developed and authored by John&nbsp;Harper, and licensed for our use under the <a href="https://www.creativecommons.org/licenses/by/3.0">Creative&nbsp;Commons&nbsp;Attribution&nbsp;3.0&nbsp;Unported&nbsp;License</a> </span>` +
    `<span> Find more content by Kirkland&nbsp;Press at <a href="https://www.olinkirk.land/press">https://www.olinkirk.land/press</a> </span> </footer>`

const pages = document.querySelectorAll('.page')

pages[0].insertAdjacentHTML('afterbegin', HEADER)
pages.forEach((page) => {
    page.insertAdjacentHTML('beforeend', FOOTER)
})
