package es.udc.pashop.backend.model.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Category;
import es.udc.pashop.backend.model.entities.CategoryDao;
import es.udc.pashop.backend.model.entities.Product;
import es.udc.pashop.backend.model.entities.ProductDao;

@Service
@Transactional(readOnly=true)
public class CatalogServiceImpl implements CatalogService {
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private ProductDao productDao;

	@Override
	public Iterable<Category> findAllCategories() {
		return categoryDao.findAll(new Sort(Sort.Direction.ASC, "name"));
	}

	@Override
	public Product findProductById(Long id) throws InstanceNotFoundException {
		
		Optional<Product> product = productDao.findById(id);
		
		if (!product.isPresent()) {
			throw new InstanceNotFoundException("project.entities.product", id);
		}
		
		return product.get();

	}

	@Override
	public Block<Product> findProducts(Long categoryId, String keywords, int startIndex, int count) {
		
		List<Product> products = productDao.find(categoryId, keywords, startIndex, count+1);
		boolean existMoreAccounts = products.size() == (count + 1);
		
		if (existMoreAccounts) {
			products.remove(products.size() - 1);
		}
		
		return new Block<>(products, existMoreAccounts);
		
	}

}
