import {appFetch} from './appFetch';

export const findAllCategories = async () => await appFetch('GET', '/catalog/categories');

export const findProducts = async ({categoryId, keywords, page}) => {

    let path = `/catalog/products?page=${page}`;

    path += categoryId ? `&categoryId=${categoryId}` : "";
    path += keywords.length > 0 ? `&keywords=${encodeURIComponent(keywords)}` : "";

    return await appFetch('GET', path);

}

export const findProductById = async id => await appFetch('GET', `/catalog/products/${id}`);
