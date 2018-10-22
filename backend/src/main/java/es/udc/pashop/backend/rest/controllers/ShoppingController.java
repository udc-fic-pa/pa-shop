package es.udc.pashop.backend.rest.controllers;

import static es.udc.pashop.backend.rest.dtos.ShoppingCartConversor.toShoppingCartDto;

import java.util.Locale;

import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.MaxItemsExceededException;
import es.udc.pashop.backend.model.entities.MaxQuantityExceededException;
import es.udc.pashop.backend.model.services.PermissionException;
import es.udc.pashop.backend.model.services.ShoppingService;
import es.udc.pashop.backend.rest.common.ErrorsDto;
import es.udc.pashop.backend.rest.dtos.ShoppingCartDto;

@RestController
@RequestMapping("/shopping")
public class ShoppingController {
	
	private final static String MAX_QUANTITY_EXCEEDED_EXCEPTION_CODE = "project.exceptions.MaxQuantityExceededException";
	private final static String MAX_ITEMS_EXCEEDED_EXCEPTION_CODE = "project.exceptions.MaxItemsExceededException";
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private ShoppingService shoppingService;
	
	@ExceptionHandler(MaxQuantityExceededException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleMaxQuantityExceededException(MaxQuantityExceededException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(MAX_QUANTITY_EXCEEDED_EXCEPTION_CODE,
			new Object[] {exception.getMaxAllowedIncrement()}, MAX_QUANTITY_EXCEEDED_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
		
	}
	
	@ExceptionHandler(MaxItemsExceededException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleMaxItemsExceededException(MaxItemsExceededException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(MAX_ITEMS_EXCEEDED_EXCEPTION_CODE, null,
			MAX_ITEMS_EXCEEDED_EXCEPTION_CODE, locale);
 
		return new ErrorsDto(errorMessage);
		
	}
	
	@PostMapping("/shoppingcarts/{shoppingCartId}/addToShoppingCart")
	public ShoppingCartDto addToShoppingCart(@RequestAttribute Long userId, @PathVariable Long shoppingCartId, 
		@RequestParam Long productId, @RequestParam @Min(value=1) short quantity) 
		throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		return toShoppingCartDto(shoppingService.addToShoppingCart(userId, shoppingCartId, productId, quantity));
		
	}

}
