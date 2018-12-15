package es.udc.pashop.backend.model.services;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.MaxItemsExceededException;
import es.udc.pashop.backend.model.entities.MaxQuantityExceededException;
import es.udc.pashop.backend.model.entities.Order;
import es.udc.pashop.backend.model.entities.ShoppingCart;

public interface ShoppingService {
	
	ShoppingCart addToShoppingCart(Long userId, Long shoppingCartId, Long productId, int quantity) 
		throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException, MaxItemsExceededException;
	
	Order buy(Long userId, Long shoppingCartId, String postalAddress, String postalCode)
		throws InstanceNotFoundException, PermissionException, EmptyShoppingCartException;
	
	Order findOrder(Long userId, Long orderId) throws InstanceNotFoundException, PermissionException;

}
