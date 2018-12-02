package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;

public class ShoppingCartItemDto {
	
	private Long productId;
	private String productName;
	private Long categoryId;
	private BigDecimal productPrice;
	private int quantity;
	
	public ShoppingCartItemDto() {}
	
	public ShoppingCartItemDto(Long productId, String productName, Long categoryId, BigDecimal productPrice,
		int quantity) {

		this.productId = productId;
		this.productName = productName;
		this.categoryId = categoryId;
		this.productPrice = productPrice;
		this.quantity = quantity;
		
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public BigDecimal getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(BigDecimal productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
