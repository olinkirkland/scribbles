const title = document.title

const HEADER = `<header> <strong>${title}</strong> <img src="assets/images/decoration-1.svg" /> <strong>by Olin Kirkland</strong> </header>`
const FOOTER =
    `<footer>` +
    `<span> A product of <a href="https://www.olinkirk.land/press">Kirkland&nbsp;Press</a> </br>Writing and layout </br>by Olin&nbsp;Kirkland </span>` +
    `<span> This work is based on <a href="https://www.bladesinthedark.com">Blades in the Dark</a>, a product of One&nbsp;Seven&nbsp;Design, <br />developed and authored by John&nbsp;Harper, and licensed for our use  </br>under the <a href="https://www.creativecommons.org/licenses/by/3.0">Creative&nbsp;Commons&nbsp;Attribution&nbsp;3.0&nbsp;Unported&nbsp;License</a> </span>` +
    `</footer>`

const pages = document.querySelectorAll('.page')

pages[0].insertAdjacentHTML('afterbegin', HEADER)
pages.forEach((page, index) => {
    page.insertAdjacentHTML(
        'beforeend',
        FOOTER.replace('{pageNumber}', index + 1) // Unused for now
    )
})
