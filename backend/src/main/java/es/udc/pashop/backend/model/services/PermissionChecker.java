package es.udc.pashop.backend.model.services;

import es.udc.pashop.backend.model.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Order;
import es.udc.pashop.backend.model.entities.ShoppingCart;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.exceptions.PermissionException;

public interface PermissionChecker {

	User checkUser(Long userId) throws InstanceNotFoundException;
	
	ShoppingCart checkShoppingCartExistsAndBelongsTo(Long shoppingCartId, Long userId)
		throws PermissionException, InstanceNotFoundException;
	
	Order checkOrderExistsAndBelongsTo(Long orderId, Long userId)
		throws PermissionException, InstanceNotFoundException;
	
}
