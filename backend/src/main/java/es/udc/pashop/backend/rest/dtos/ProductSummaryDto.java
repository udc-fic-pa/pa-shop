package es.udc.pashop.backend.rest.dtos;

public class ProductSummaryDto {
	
	private Long productId;
	private String name;
	private Long categoryId;
	
	public ProductSummaryDto() {}
	
	public ProductSummaryDto(Long productId, String name, Long categoryId) {

		this.productId = productId;
		this.name = name;
		this.categoryId = categoryId;
		
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

}
