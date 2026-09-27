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
