package es.udc.pashop.backend.model.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.MaxItemsExceededException;
import es.udc.pashop.backend.model.entities.MaxQuantityExceededException;
import es.udc.pashop.backend.model.entities.Product;
import es.udc.pashop.backend.model.entities.ProductDao;
import es.udc.pashop.backend.model.entities.ShoppingCart;
import es.udc.pashop.backend.model.entities.ShoppingCartItem;
import es.udc.pashop.backend.model.entities.ShoppingCartItemDao;

@Service
@Transactional
public class ShoppingServiceImpl implements ShoppingService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ShoppingCartItemDao shoppingCartItemDao;

	public ShoppingCart addToShoppingCart(Long userId, Long shoppingCartId, Long productId, short quantity)
		throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		ShoppingCart shoppingCart = permissionChecker.checkShoppingCartExistsAndBelongsTo(shoppingCartId, userId);
		Optional<Product> product = productDao.findById(productId);
		
		if (!product.isPresent()) {
			throw new InstanceNotFoundException("project.entities.product", productId);
		}
		
		Optional<ShoppingCartItem> existingCartItem = shoppingCart.getItem(productId);
		
		if (existingCartItem.isPresent()) {
			existingCartItem.get().incrementQuantity(quantity);
		} else {
			ShoppingCartItem newCartItem = new ShoppingCartItem(product.get(), shoppingCart);
			newCartItem.incrementQuantity(quantity);
			shoppingCart.addItem(newCartItem);
			shoppingCartItemDao.save(newCartItem);
		}
		
		return shoppingCart;
		
	}

}
