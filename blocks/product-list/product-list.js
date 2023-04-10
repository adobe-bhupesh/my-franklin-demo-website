const pageData = {
    offset: 0,
    limit: 20,
    total: 0,
    currentPage: 0,
    totalPages: 0,
};

const $productListEl = document.createElement('ul');

const loadData = async (offset, limit) => {
    if ((!offset && offset !== 0) || (!limit && !limit === 0)) {
        throw new Error(`Required parameters Offset and Limit are not available.`);
    }

    const resp = await fetch(`/products.json?offset=${offset}&limit=${limit}`);
    if (resp.ok) {
        return await resp.json();
    }
};

const generateProductList = (productData) => {
    productData.forEach(item => {
        const $li = document.createElement('li');
        $li.classList.add('product-item-wrapper');

        const $p1 = document.createElement('p');
        $p1.innerHTML = item.Products;

        const $p2 = document.createElement('p');
        $p2.innerHTML = item.Price;
        $li.append($p1);
        $li.append($p2);
        $productListEl.append($li);
    });
};

const updateProductList = (productData) => {
    $productListEl.innerHTML = '';
    generateProductList(productData.data);
    updatePageNumData(productData);
};

const updatePageNumData = (metaData) => {
    if (metaData) {
        pageData.offset = metaData.offset;
        pageData.limit = metaData.limit;
        pageData.total = metaData.total;
        pageData.totalPages = metaData.total / metaData.limit;
    }
};

const generatePagination = () => {
    const $pageNumWrap = document.createElement('div');

    const $prevPageBtn = document.createElement('button');
    $prevPageBtn.innerText = 'Prev';
    $pageNumWrap.append($prevPageBtn);
    $prevPageBtn.addEventListener('click', async (evt) => {
        if (pageData.currentPage > 0) {
            pageData.currentPage--;
            console.log(pageData);
            pageData.offset = pageData.currentPage * pageData.limit;
            const products = await loadData(pageData.offset, pageData.limit);
            updateProductList(products);
        }
    });

    const $nextPageBtn = document.createElement('button');
    $nextPageBtn.innerText = 'Next';
    $pageNumWrap.append($nextPageBtn);
    $nextPageBtn.addEventListener('click', async (evt) => {
        if (pageData.currentPage < (pageData.total - pageData.currentPage * pageData.limit)) {
            pageData.currentPage++;
            console.log(pageData);
            pageData.offset = pageData.currentPage * pageData.limit;
            const products = await loadData(pageData.offset, pageData.limit);
            updateProductList(products);
        }
    });

    return $pageNumWrap;
};

export default async function decorate(block) {
    const productData = await loadData(pageData.offset, pageData.limit);
    if (productData) {
        generateProductList(productData.data);
        updatePageNumData(productData);
        const $pagination = generatePagination();
        block.append($productListEl);
        block.append($pagination);
    }
}

