import { html, render } from '../node_modules/lit-html/lit-html.js'

const homeTemplate = () => html`
    <h1>Home</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, sed.</p>
`

const root = document.getElementById('root');

export const homeView = (ctx) => {
    render(homeTemplate(), root);
}