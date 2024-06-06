import {appFetch2} from './appFetch';

export const findAllCategories = async () => await appFetch2('GET', '/catalog/categories');

export const findProducts = async ({categoryId, keywords, page}) => {

    let path = `/catalog/products?page=${page}`;

    path += categoryId ? `&categoryId=${categoryId}` : "";
    path += keywords.length > 0 ? `&keywords=${encodeURIComponent(keywords)}` : "";

    return await appFetch2('GET', path);

}

export const findProductById = async (id) => await appFetch2('GET', `/catalog/products/${id}`);
