package es.udc.pashop.backend.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ShoppingCartItem {
	
	public static final short MAX_QUANTITY = 100;
	
	private Long id;
	private Product product;
	private ShoppingCart shoppingCart;
	private short quantity;
	
	public ShoppingCartItem() {}
	
	public ShoppingCartItem(Product product, ShoppingCart shoppingCart) {
		
		this.product = product;	
		this.shoppingCart = shoppingCart;
		
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
	
	public short getQuantity() {
		return quantity;
	}
	
	public void setQuantity(short quantity) {
		this.quantity = quantity;
	}
	
	public void incrementQuantity(short increment) throws MaxQuantityExceededException {
		
		if (quantity + increment > MAX_QUANTITY ) {
			throw new MaxQuantityExceededException((short) (MAX_QUANTITY - quantity));
		}
		
		quantity += increment;
		
	}

}
