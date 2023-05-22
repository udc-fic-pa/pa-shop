package es.udc.pashop.backend.model.entities;

import java.math.BigDecimal;
import java.math.RoundingMode;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {
	
	private Long id;
	private String name;
	private String description;
	private BigDecimal price;
	private Category category;
	
	public Product() {}
	
	public Product(String name, String description, BigDecimal price, Category category) {

		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
		
		price.setScale(2, RoundingMode.HALF_EVEN);
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price.setScale(2, RoundingMode.HALF_EVEN);
	}

	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name="categoryId")
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}
