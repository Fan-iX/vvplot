import cssText from 'highlight.js/styles/github.css?inline'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('html', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)

export default class PreHighlightElement extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
<style>pre{margin: 0;}pre,code{font-family: var(--default-mono-font-family);line-break: anywhere;}${cssText}</style>
<pre id="raw"><slot></slot></pre>
<pre id="cooked" hidden></pre>
`
        const slot = this.shadowRoot.querySelector('slot')
        slot.addEventListener('slotchange', this.handleSlotChange.bind(this))
        this.debounceTimer = null
        this.__raw = this.shadowRoot.querySelector('#raw')
        this.__cooked = this.shadowRoot.querySelector('#cooked')
    }

    connectedCallback() {
        this.highlightContent()
    }

    handleSlotChange(event) {
        this.__raw.hidden = false
        this.__cooked.hidden = true
        this.debouncedHightlightContent()
    }

    debouncedHightlightContent() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
            this.highlightContent()
            this.debounceTimer = null
        }, 300)
    }

    highlightContent() {
        if (typeof hljs === 'undefined') return
        const slot = this.shadowRoot.querySelector('slot')
        if (!slot) return

        let text = slot.assignedNodes({ flatten: true }).map(n => n.textContent).join("").trim()
        const lang = this.getAttribute('lang')
        const code = document.createElement('code')

        if (lang) {
            const result = hljs.highlight(text, { language: lang, ignoreIllegals: true })
            code.innerHTML = result.value
            code.classList.add(`language-${lang}`)
        } else {
            const result = hljs.highlightAuto(text)
            code.innerHTML = result.value
            if (result.language) code.classList.add(`language-${result.language}`)
        }
        this.__cooked.replaceChildren(code)
        this.__raw.hidden = true
        this.__cooked.hidden = false
    }
}
