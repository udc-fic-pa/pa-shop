package es.udc.pashop.backend.rest.dtos;

import java.util.List;

public class OrderDto {
	
	private Long id;
	private List<OrderItemDto> items;
	private long date;
	private String postalAddress;
	private String postalCode;
	
	public OrderDto() {}

	public OrderDto(Long id, List<OrderItemDto> items, long date, String postalAddress, String postalCode) {

		this.id = id;
		this.items = items;
		this.date = date;
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

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
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
