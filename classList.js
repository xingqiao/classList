// Array.indexOf
;(function(){
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(elt /*, from*/){
			var l = this.length >>> 0;
			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) from += l;
			for (; from < l; from++) {
				if (from in this && this[from] === elt)
					return from;
			}
			return -1;
		};
	}
})();
// HTMLElement.classList
;(function(){
	if (!("classList" in document.documentElement)) {
		function addClassList(e) {
			Object.defineProperty(e.prototype, 'classList', {
				get: function() {
					var self = this, cls = self.className.split(/\s+/g);
					function _update(type) {
						return function(value) {
							var index = cls.indexOf(value), isToggle = type == "toggle";
							if (isToggle) {
								type = ~index ? "remove" : "add";
							}
							if (type == "add") {
								~index || cls.push(value);
							} else if (type == "remove") {
								~index && cls.splice(index, 1);
							}
							self.className = cls.join(" ");
							if (isToggle) {
								return !~index;
							}
						}
					};
					cls.add = _update("add");
					cls.remove = _update("remove");
					cls.toggle = _update("toggle");
					cls.contains = function(value) {
						return !!~cls.indexOf(value);
					};
					cls.item = function(i) {
						return cls[i] || null;
					};
					return cls;
				}
			});
		};
		if (window.HTMLElement) {
			addClassList(HTMLElement);
		} else {
			var doms = ["HTMLAnchorElement", "HTMLAreaElement", "HTMLBRElement", "HTMLBaseElement", "HTMLBodyElement", "HTMLButtonElement", "HTMLDListElement", "HTMLDivElement", "HTMLDocument", "HTMLEmbedElement", "HTMLFieldSetElement", "HTMLFontElement", "HTMLFormElement", "HTMLFrameElement", "HTMLFrameSetElement", "HTMLHRElement", "HTMLHeadElement", "HTMLHeadingElement", "HTMLHtmlElement", "HTMLIFrameElement", "HTMLImageElement", "HTMLInputElement", "HTMLLIElement", "HTMLLabelElement", "HTMLLegendElement", "HTMLLinkElement", "HTMLMapElement", "HTMLMarqueeElement", "HTMLMetaElement", "HTMLOListElement", "HTMLObjectElement", "HTMLOptionElement", "HTMLParagraphElement", "HTMLParamElement", "HTMLScriptElement", "HTMLSelectElement", "HTMLSpanElement", "HTMLStyleElement", "HTMLTableCaptionElement", "HTMLTableCellElement", "HTMLTableColElement", "HTMLTableElement", "HTMLTableRowElement", "HTMLTableSectionElement", "HTMLTextAreaElement", "HTMLTitleElement", "HTMLUListElement", "HTMLUnknownElement"];
			for (var i = 0; i < doms.length; i++) {
				window[doms[i]] && addClassList(window[doms[i]]);
			}
		}
	}
})();