document.addEventListener("DOMContentLoaded", function (event) {
  let categoriesData = {
    name: "Название категории",
    quantity: "134 товара",
  };

  let categoriesSidebarData = {
    name: "Категория в которой нашли что-то",
  };

  let productData = [
    {
      name: "Рюкзак",
      price: 1000,
    },
    {
      name: "Рюкзак",
      price: 2000,
    },
    {
      name: "Рюкзак",
      price: 3000,
    },
    {
      name: "Чехол",
      price: 100,
    },
    {
      name: "Чехол",
      price: 150,
    },
    {
      name: "Чехол",
      price: 500,
    },
    {
      name: "Тумбочка",
      price: 3000,
    },
    {
      name: "Тумбочка",
      price: 3800,
    },
    {
      name: "Тумбочка",
      price: 4500,
    },
    {
      name: "Часы",
      price: 10000,
    },
    {
      name: "Часы",
      price: 11000,
    },
    {
      name: "Часы",
      price: 12000,
    },
    {
      name: "Тумбочка",
      price: 3000,
    },
    {
      name: "Тумбочка",
      price: 3800,
    },
    {
      name: "Тумбочка",
      price: 4500,
    },
    {
      name: "Часы",
      price: 10000,
    },
    {
      name: "Часы",
      price: 11000,
    },
    {
      name: "Часы",
      price: 12000,
    },
  ];

  let currentArray = productData;
  let currentSort = sortDefault;
  let currentPage = 1;
  let currentPageSize;
  let priceFrom;
  let priceTo;
  let discount = 0.9;

  document.querySelector(".focus-default").focus();

  renderSlider();

  clearCheckbox();

  initPageSize();

  renderCategories();

  renderSidebar();

  initSearch();

  initPagination();

  initPriceRange();

  initSort();

  renderProductsPage(1);

  function initSort() {
    let sortButtons = document.querySelector(".catalog-sorter");

    sortButtons.addEventListener("click", function (e) {
      e.preventDefault();
      currentSort = e.target.dataset.sort;
      switch (e.target.dataset.sort) {
        case "cheap":
          currentSort = sortAscending;
          break;
        case "expensive":
          currentSort = sortDescending;
          break;
        case "default":
        default:
          currentSort = sortDefault;
          break;
      }
      renderProducts();
    });
  }

  function sortAscending(a, b) {
    return a.price - b.price;
  }

  function sortDescending(a, b) {
    return b.price - a.price;
  }

  function sortDefault(a, b) {
    return 0;
  }

  function renderSlider() {
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
  }

  function initPageSize() {
    let select = document.querySelector(".select-val");
    currentPageSize = select.value;
    select.addEventListener("change", function (e) {
      currentPageSize = select.value;
      renderProducts();
    });
  }

  function clearCheckbox() {
    let clearCheckboxButton = document.querySelector(".clear");

    clearCheckboxButton.addEventListener("click", function (e) {
      e.preventDefault();
      let checkboxProducts = document.querySelectorAll(".brand-item");
      for (let i = 0; i < checkboxProducts.length; i++) {
        checkboxProducts[i].checked = false;
      }
    });
  }

  function renderProductsPage(pageNum) {
    currentPage = pageNum;
    renderProducts();
  }

  function renderCategories() {
    let templateCategory = document.querySelector(".category-item");

    for (let i = 0; i < 5; i++) {
      let clone = document.importNode(templateCategory.content, true);
      Object.keys(categoriesData).forEach((key) => {
        clone.querySelector(".item-" + key).textContent = categoriesData[key];
      });

      let productCategories = document.querySelector(".product-categories");
      productCategories.appendChild(clone);
    }
  }

  function renderSidebar() {
    let templateCategoriesSidebar = document.querySelector(
      ".all-categories-sidebar"
    );

    for (let i = 0; i < 8; i++) {
      let clone = document.importNode(templateCategoriesSidebar.content, true);

      Object.keys(categoriesSidebarData).forEach((key) => {
        clone.querySelector(".item-sidebar").innerHTML =
          categoriesSidebarData[key] + " (xxx)";
      });

      let moreCategoriesLink = document.querySelector(".more-categories-link");
      let allCategoriesList = document.querySelector(".all-categories-list");
      allCategoriesList.insertBefore(clone, moreCategoriesLink);
    }
  }

  function renderProducts() {
    let templateProductCard = document.querySelector(".product-card");
    let productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = "";

    let firstIndex = currentPage * currentPageSize - currentPageSize;
    let lastIndex = currentPage * currentPageSize;

    currentArray
      .slice(firstIndex, lastIndex)
      .filter((card) => {
        if (!priceTo && !priceFrom) {
          return true;
        } else if (priceTo && !priceFrom) {
          return priceTo >= card.price * discount;
        } else if (!priceTo && priceFrom) {
          return priceFrom <= card.price * discount;
        } else {
          return (
            priceFrom <= card.price * discount &&
            priceTo >= card.price * discount
          );
        }
      })
      .sort(currentSort)
      .forEach((card) => {
        let clone = document.importNode(templateProductCard.content, true);
        Object.keys(card).forEach((key) => {
          if (key === "price") {
            clone.querySelector(".product-price-current").innerHTML =
              card[key] + "$";
            clone.querySelector(".product-price-discount").innerHTML =
              card[key] * discount + "$";
          } else {
            clone.querySelector(".product-" + key).innerHTML = card[key];
          }
        });
        productsContainer.appendChild(clone);
      });
  }

  function onSearchChange(textValue) {
    currentPage = 1;
    currentArray = productData.filter((product) =>
      product.name.toLowerCase().includes(textValue)
    );
  }

  function initSearch() {
    let productSearch = document.querySelector(".search-input");
    productSearch.addEventListener("input", function (e) {
      let textValue = this.value;
      onSearchChange(textValue);
      renderProducts();
    });

    let closeButton = document.querySelector(".button-close");
    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      productSearch.value = "";
      onSearchChange("");
      renderProducts();
    });
  }

  function initPagination() {
    let pagination = document.querySelector(".pagination");
    pagination.addEventListener("click", function (e) {
      e.preventDefault();
      let currentPage = e.target.dataset.page;
      renderProductsPage(parseInt(currentPage));
    });
  }

  function initPriceRange() {
    let priceFromInput = document.querySelector(".input-from");
    let priceToInput = document.querySelector(".input-to");
    priceFromInput.addEventListener("input", function (e) {
      priceFrom = parseFloat(priceFromInput.value);
      renderProducts();
    });

    priceToInput.addEventListener("input", function (e) {
      priceTo = parseFloat(priceToInput.value);
      renderProducts();
    });
  }
});
