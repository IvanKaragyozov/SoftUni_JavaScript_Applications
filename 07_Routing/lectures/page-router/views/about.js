import { html, render } from '../node_modules/lit-html/lit-html.js'

const aboutTemplate = () => html`
    <h1>About</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, sed.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, sed.</p>
`

const root = document.getElementById('root');

export const aboutView = (ctx) => {
    render(aboutTemplate(), root);
}