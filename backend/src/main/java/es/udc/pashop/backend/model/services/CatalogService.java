package es.udc.pashop.backend.model.services;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Category;
import es.udc.pashop.backend.model.entities.Product;

public interface CatalogService {
	
	Iterable<Category> findAllCategories();
	
	Product findProductById(Long id) throws InstanceNotFoundException;
	
	Block<Product> findProducts(Long categoryId, String keywords, int startIndex, int count);

}
