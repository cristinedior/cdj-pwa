import { getDb, putDb } from './database';

export default class {
    constructor() {
        this.editor = document.querySelector('#editor');
        this.editor.addEventListener('blur', () => {
            putDb(this.editor.innerHTML);
        });
    }

    async init() {
        const content = await getDb();
        if (content) {
            this.editor.innerHTML = content;
        }
    }
}
