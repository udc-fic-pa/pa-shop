package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
	
	private Long id;
	private List<OrderItemDto> items;
	private LocalDateTime date;
	private BigDecimal totalPrice;
	private String postalAddress;
	private String postalCode;
	
	public OrderDto() {}

	public OrderDto(Long id, List<OrderItemDto> items, LocalDateTime date, BigDecimal totalPrice, String postalAddress, String postalCode) {

		this.id = id;
		this.items = items;
		this.date = date;
		this.totalPrice = totalPrice;
		this.postalAddress = postalAddress;
		this.postalCode = postalCode;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<OrderItemDto> getItems() {
		return items;
	}

	public void setItems(List<OrderItemDto> items) {
		this.items = items;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getPostalAddress() {
		return postalAddress;
	}

	public void setPostalAddress(String postalAddress) {
		this.postalAddress = postalAddress;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

}
