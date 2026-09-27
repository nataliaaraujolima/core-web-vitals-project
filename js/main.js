document.querySelectorAll("link[data-apply-css]").forEach((link) => {
	const apply = () => {
		link.media = "all";
	};

	if (link.sheet) {
		apply();
		return;
	}

	link.addEventListener("load", apply, { once: true });
});

function loadHeeboFont() {
	if (document.getElementById("heebo-font")) return;
	const link = document.createElement("link");
	link.id = "heebo-font";
	link.rel = "stylesheet";
	link.href = "https://fonts.googleapis.com/css?family=Heebo:400,700&display=optional";
	document.head.appendChild(link);
}

const loadFonts = () => {
	if ("requestIdleCallback" in window) {
		requestIdleCallback(loadHeeboFont, { timeout: 3000 });
	} else {
		setTimeout(loadHeeboFont, 1500);
	}
};

if (document.readyState === "complete") {
	loadFonts();
} else {
	window.addEventListener("load", loadFonts, { once: true });
}
