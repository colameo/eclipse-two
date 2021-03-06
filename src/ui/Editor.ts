/*******************************************************************************
 * Copyright (c) 2017 QNX Software Systems and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
import customElements from 'ui/customElements';
import * as path from 'path';

export class EditorTab extends HTMLElement {
    static tag = 'two-editortab';

    editor: Editor;
    a: HTMLAnchorElement;

    connectedCallback() {
        this.a = document.createElement('a');
        this.a.href = '#';
        this.a.textContent = path.basename(this.editor.filePath);
        this.appendChild(this.a);

        const span = document.createElement('span');
        span.classList.add('fa', 'fa-times-circle');
        span.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            const closeEvent = new CustomEvent('close-editor', {
                detail: {
                    editor: this.editor
                },
                bubbles: true,
                cancelable: true
            })
            this.editor.dispatchEvent(closeEvent);
        })
        this.appendChild(span);
    }
}

customElements.define(EditorTab.tag, EditorTab);

export abstract class Editor extends HTMLElement {
    filePath: string;
    private _editorTab: EditorTab;

    openFile(filePath: string) {
        this.filePath = filePath;
    }

    get editorTab(): EditorTab {
        if (!this._editorTab) {
            this._editorTab = new EditorTab();
            this._editorTab.editor = this;
        }
        return this._editorTab;
    }

    set active(val: boolean) {
        if (val) {
            this.style.display = 'block';
            this.editorTab.classList.add('active');
        } else {
            this.style.display = 'none';
            this.editorTab.classList.remove('active');
        }
    }
}
