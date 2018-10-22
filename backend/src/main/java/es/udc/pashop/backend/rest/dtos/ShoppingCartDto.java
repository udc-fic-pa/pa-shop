package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;
import java.util.List;

public class ShoppingCartDto {
	
	private Long id;
	private List<ShoppingCartItemDto> items;
	private BigDecimal totalPrice;
	
	public ShoppingCartDto() {}
	
	public ShoppingCartDto(Long shoppingCartId, List<ShoppingCartItemDto> items, BigDecimal totalPrice) {
		
		this.id = shoppingCartId;
		this.items = items;
		this.totalPrice = totalPrice;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<ShoppingCartItemDto> getItems() {
		return items;
	}

	public void setItems(List<ShoppingCartItemDto> items) {
		this.items = items;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

}
