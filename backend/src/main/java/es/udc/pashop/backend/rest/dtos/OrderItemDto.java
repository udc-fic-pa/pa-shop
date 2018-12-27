package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;

public class OrderItemDto {
	
	private Long id;
	private Long productId;
	private String productName;
	private BigDecimal price;
	private int quantity;
	
	public OrderItemDto() {}

	public OrderItemDto(Long id, Long productId, String productName, BigDecimal price, int quantity) {
		
		this.id = id;
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.quantity = quantity;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
