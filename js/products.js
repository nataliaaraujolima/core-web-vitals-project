async function loadProducts() {
	const response = await fetch("https://fakestoreapi.com/products");
	const products = await response.json();
	displayProducts(products);
}

function displayProducts(products) {
	const container = document.querySelector("#all-products .container");
	const fragment = document.createDocumentFragment();

	products.forEach((product) => {
		// Create the main product div
		const productElement = document.createElement("div");
		productElement.classList.add("product");

		// Create the product picture div
		const pictureDiv = document.createElement("div");
		pictureDiv.classList.add("product-picture");
		const img = document.createElement("img");
		img.alt = `product: ${product.title}`;
		img.width = 250;
		img.height = 250;
		img.loading = "lazy";
		img.src = product.image;
		pictureDiv.appendChild(img);

		// Create the product info div
		const infoDiv = document.createElement("div");
		infoDiv.classList.add("product-info");

		const category = document.createElement("p");
		category.classList.add("categories");
		category.textContent = product.category;

		const title = document.createElement("h3");
		title.classList.add("title");
		title.textContent = product.title;

		const price = document.createElement("p");
		price.classList.add("price");
		const priceSpan = document.createElement("span");
		priceSpan.textContent = `US$ ${product.price}`;
		price.appendChild(priceSpan);

		const button = document.createElement("button");
		button.textContent = "Add to bag";

		// Append elements to the product info div
		infoDiv.appendChild(category);
		infoDiv.appendChild(title);
		infoDiv.appendChild(price);
		infoDiv.appendChild(button);

		// Append picture and info divs to the main product element
		productElement.appendChild(pictureDiv);
		productElement.appendChild(infoDiv);

		fragment.appendChild(productElement);
	});

	container.appendChild(fragment);
}

function watchProductsSection() {
	const productSection = document.querySelector("#all-products");
	if (!productSection) return;

	const observer = new IntersectionObserver(
		(entries, currentObserver) => {
			if (!entries[0]?.isIntersecting) return;
			currentObserver.disconnect();
			loadProducts();
		},
		{ rootMargin: "0px 0px 200px 0px" }
	);

	observer.observe(productSection);
}

if (document.readyState === "complete") {
	watchProductsSection();
} else {
	window.addEventListener("load", watchProductsSection, { once: true });
}
