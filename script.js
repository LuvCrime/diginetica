document.addEventListener("DOMContentLoaded", function (event) {
  let categoriesData = {
    name: "Название категории",
    quantity: "134 товара",
    img: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
    </svg>`,
  };

  let categoriesSidebarData = {
    name: "Категория в которой нашли что-то",
  };

  let productData = [
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Рюкзак",
      price: 1000,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Рюкзак",
      price: 2000,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Рюкзак",
      price: 3000,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Чехол",
      price: 100,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Чехол",
      price: 150,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Чехол",
      price: 500,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Тумбочка",
      price: 3000,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Тумбочка",
      price: 3800,
    },
    {
      img: `<svg width="260" height="260" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="3" fill="#C4C4C4"/>
      </svg>`,
      name: "Тумбочка",
      price: 4500,
    },
  ];

  document.querySelector(".focus-default").focus();

  let templateCategory = document.querySelector(".category-item");

  let templateCategoriesSidebar = document.querySelector(
    ".all-categories-sidebar"
  );

  let clearCheckboxButton = document.querySelector(".clear");

  let templateProductCard = document.querySelector(".product-card");

  for (let i = 0; i < 5; i++) {
    let clone = document.importNode(templateCategory.content, true);
    Object.keys(categoriesData).forEach((key) => {
      if (key === "img") {
        clone.querySelector(".item-" + key).innerHTML = categoriesData[key];
      } else {
        clone.querySelector(".item-" + key).textContent = categoriesData[key];
      }
    });
    let productCategories = document.querySelector(".product-categories");
    productCategories.appendChild(clone);
  }

  for (let i = 0; i < 8; i++) {
    let clone = document.importNode(templateCategoriesSidebar.content, true);

    Object.keys(categoriesSidebarData).forEach((key) => {
      clone.querySelector(".item-sidebar").innerHTML =
        categoriesSidebarData[key];
    });
    let moreCategoriesLink = document.querySelector(".more-categories-link");
    let allCategoriesList = document.querySelector(".all-categories-list");
    allCategoriesList.insertBefore(clone, moreCategoriesLink);
  }

  for (let i = 0; i < 5; i++) {
    productData.forEach((product) => {
      let clone = document.importNode(templateProductCard.content, true);
      console.log(product);
      Object.keys(product).forEach((key) => {
        if (key === "price") {
          clone.querySelector(".product-price-current").innerHTML =
            product[key];
          clone.querySelector(".product-price-discount").innerHTML =
            product[key] * 0.9;
        } else {
          clone.querySelector(".product-" + key).innerHTML = product[key];
        }
      });
      let productsContainer = document.querySelector(".products-container");
      productsContainer.appendChild(clone);
    });
  }
  let slider = document.getElementById("slider");

  noUiSlider.cssClasses.target += " range-slider";

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });

  clearCheckboxButton.addEventListener("click", function (e) {
    e.preventDefault();
    let checkboxProducts = document.querySelectorAll(".brand-item");
    for (let i = 0; i < checkboxProducts.length; i++) {
      checkboxProducts[i].checked = false;
    }
  });
});
