package es.udc.pashop.backend.rest.dtos;

import javax.validation.constraints.NotNull;

public class RemoveShoppingCartItemDto {
	
	private Long productId;
	
	public RemoveShoppingCartItemDto() {}

	@NotNull
	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

}
