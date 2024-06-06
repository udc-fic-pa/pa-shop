import {appFetch, config} from './appFetch'; // FIXME: remove when appFetch2 replaces appFetch.
import {appFetch2} from './appFetch';

export const findAllCategories = (onSuccess) => 
    appFetch('/catalog/categories', config('GET'), onSuccess);

export const findProducts = async ({categoryId, keywords, page}) => {

    let path = `/catalog/products?page=${page}`;

    path += categoryId ? `&categoryId=${categoryId}` : "";
    path += keywords.length > 0 ? `&keywords=${encodeURIComponent(keywords)}` : "";

    return await appFetch2('GET', path);

}

export const findByProductId = (id, onSuccess) => 
    appFetch(`/catalog/products/${id}`, config('GET'), onSuccess);
