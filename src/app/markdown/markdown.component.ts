import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Http} from "@angular/http";
import {MarkdownService} from "./markdown.service";
import "./prism.languages";
import * as Prism from "prismjs";

export class TocEvent {
	tocFrom: string;
	toc: Toc[];

	constructor(tocFrom: string, toc: Toc[]) {
		this.tocFrom = tocFrom;
		this.toc = toc;
	}
}

export class Toc {
	anchor: string;
	level: number;
	text: string;
	raw: string;

	constructor(anchor: string, level: number, text: string, raw: string) {
		this.anchor = anchor;
		this.level = level;
		this.text = text;
		this.raw = raw;
	}
}

@Component({
	selector: 'markdown,[Markdown]',
	template: '<ng-content></ng-content>',
	styles: [
			`.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
          background: none;
      }`
	]
})
export class MarkdownComponent implements OnInit, AfterViewInit {
	private _path: string;
	private _data: string;
	private _md: any;
	private _ext: string;
	private toc: Toc[] = [];
	changeLog: string[] = [];

	@Output() tocUpdate = new EventEmitter();

	hasRendered = false;

	constructor(private mdService: MarkdownService,
							private el: ElementRef,
							private http: Http) {
		this.mdService.renderer.heading = this.onRenderHeading.bind(this);
	}

	ngOnInit() {

	}

	onRenderHeading(text, level, raw) {
		let anchor = 'toc_id' + String(text).hashCode();
		this.toc.push(new Toc(anchor, level, text, raw));
		return '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>\n';
	}

	@Input()
	set path(value: string) {
		this._path = value;
		this.onPathChange();
	}

	@Input()
	set data(value: string) {
		this.hasRendered = false;
		if (this._data != value) {
			this._data = value;
			this.onDataChange(value);
		}
	}

	// on input
	onDataChange(data: string) {
		this.renderMarkdown(data, 'content-data');
		Prism.highlightAll(false);
	}

	renderMarkdown(data: string, from: string) {
		if (!this.hasRendered) {
			this.hasRendered = true;
			this.toc = [];
			this.el.nativeElement.innerHTML = this.mdService.compile(data);
			this.tocUpdate.emit(new TocEvent(from, this.toc));
		}
	}

	/**
	 *  After view init
	 */
	ngAfterViewInit() {
		if (this._path) {
			this.onPathChange();
		} else {
			this.processRaw();
		}
	}

	processRaw() {
		this._md = this.prepare(this.el.nativeElement.innerHTML);
		this.renderMarkdown(this._md, 'content-raw');
		Prism.highlightAll(true);
	}

	/**
	 * get remote conent;
	 */
	onPathChange() {
		this._ext = this._path && this._path.split('.').splice(-1).join();
		this.mdService.getContent(this._path)
			.subscribe(
				data => {
					this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
					this.renderMarkdown(this.prepare(this._md), 'content-path');
					Prism.highlightAll(true);
				},
				err => this.handleError);
	}

	/**
	 * catch http error
	 */
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	/**
	 * Prepare string
	 */
	prepare(raw: string) {
		if (!raw) {
			return '';
		}
		if (this._ext === 'md' || !this.path) {
			let isCodeBlock = false;
			return raw.split('\n').map((line: string) => {
				if (this.trimLeft(line).substring(0, 3) === "```") {
					isCodeBlock = !isCodeBlock;
				}
				return isCodeBlock ? line : line.trim();
			}).join('\n');
		}
		return raw.replace(/\"/g, '\'');
	}

	/**
	 * Trim left whitespace
	 */
	private trimLeft(line: string) {
		// return line.replace(/^\s+|\s+$/g, '');
		return line;
	}
}
