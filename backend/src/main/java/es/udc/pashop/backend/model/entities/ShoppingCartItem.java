package es.udc.pashop.backend.model.entities;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class ShoppingCartItem {
	
	public static final int MAX_QUANTITY = 100;
	
	private Long id;
	private Product product;
	private ShoppingCart shoppingCart;
	private int quantity = 0;
	
	public ShoppingCartItem() {}
	
	public ShoppingCartItem(Product product, ShoppingCart shoppingCart, int quantity) throws MaxQuantityExceededException {
		
		this.product = product;	
		this.shoppingCart = shoppingCart;
		
		setQuantity(quantity);
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name="productId")
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	

	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name="shoppingCartId")
	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) throws MaxQuantityExceededException {
		
		if (quantity > MAX_QUANTITY ) {
			throw new MaxQuantityExceededException(MAX_QUANTITY);
		}
		
		this.quantity = quantity;
		
	}
	
	public void incrementQuantity(int increment) throws MaxQuantityExceededException {
		
		if (quantity + increment > MAX_QUANTITY) {
			throw new MaxQuantityExceededException(MAX_QUANTITY - quantity);
		}
		
		this.quantity += increment;
		
	}
	
	@Transient
	public BigDecimal getTotalPrice() {
		return product.getPrice().multiply(new BigDecimal(quantity));
	}

}
