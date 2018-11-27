package es.udc.pashop.backend.test.model.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Category;
import es.udc.pashop.backend.model.entities.CategoryDao;
import es.udc.pashop.backend.model.entities.MaxItemsExceededException;
import es.udc.pashop.backend.model.entities.MaxQuantityExceededException;
import es.udc.pashop.backend.model.entities.Product;
import es.udc.pashop.backend.model.entities.ProductDao;
import es.udc.pashop.backend.model.entities.ShoppingCart;
import es.udc.pashop.backend.model.entities.ShoppingCartItem;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.services.PermissionException;
import es.udc.pashop.backend.model.services.ShoppingService;
import es.udc.pashop.backend.model.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ShoppingServiceTest {
	
	private final Long NON_EXISTENT_ID = new Long(-1);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ShoppingService shoppingService;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private ProductDao productDao; 
	
	private User signUpUser(String userName) {
		
		User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
		
		try {
			userService.signUp(user);
		} catch (DuplicateInstanceException e) {
			throw new RuntimeException(e);
		}
		
		return user;
		
	}
	
	private Category addCategory(String name) {
		return categoryDao.save(new Category("category"));
	}
	
	private Product addProduct(String name, Category category) {
		return productDao.save(new Product(name, "description", new BigDecimal(1), category));
	}
	
	private Product addProduct(String name) {
		return addProduct(name, addCategory("category"));
	}
	
	@Test
	public void testAddToEmptyShoppingCart() throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException,
		MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity = 2;
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity);
		
		List<ShoppingCartItem> items = new ArrayList<>(user.getShoppingCart().getItems());
		
		assertEquals(1, items.size());
		assertEquals(product, items.get(0).getProduct());
		assertEquals(quantity, items.get(0).getQuantity());
	
		
	}
	
	@Test
	public void testAddNewProductToNonEmptyShoppingCart() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product1 = addProduct("product1");
		Product product2 = addProduct("product2", product1.getCategory());
		int quantity1 = 1;
		int quantity2 = 2;
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product1.getId(), quantity1);
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product2.getId(), quantity2);
		
		Collection<ShoppingCartItem> items = user.getShoppingCart().getItems();
		
		assertEquals(2, items.size());
	
		Optional<ShoppingCartItem> item1 = items.stream().filter(i -> i.getProduct() == product1).findFirst();
		Optional<ShoppingCartItem> item2 = items.stream().filter(i -> i.getProduct() == product2).findFirst();
		
		assertTrue(item1.isPresent());
		assertEquals(item1.get().getQuantity(), quantity1);
		assertTrue(item2.isPresent());
		assertEquals(item2.get().getQuantity(), quantity2);
		
	}
	
	@Test
	public void testAddExistingProductToShoppingCart() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity1 = 1;
		int quantity2 = 2;
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity1);
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity2);
		
		List<ShoppingCartItem> items = new ArrayList<>(user.getShoppingCart().getItems());
		
		assertEquals(1, items.size());
		assertEquals(product, items.get(0).getProduct());
		assertEquals(quantity1 + quantity2, items.get(0).getQuantity());

		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testAddToNonExistingShoppingCart() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.addToShoppingCart(user.getId(), NON_EXISTENT_ID, product.getId(), 1);
		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testAddNonExistingProductToShoppingCart() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), NON_EXISTENT_ID, 1);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testAddToAnotherShoppingCart() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user1 = signUpUser("user1");
		User user2 = signUpUser("user2");
		Product product = addProduct("product");
		
		shoppingService.addToShoppingCart(user1.getId(), user2.getShoppingCart().getId(), product.getId(), 1);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testAddToShoppingCartWithNonExistentUserId() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.addToShoppingCart(NON_EXISTENT_ID, user.getShoppingCart().getId(), product.getId(), 1);
		
	}
	
	@Test
	public void testAddNewProductToShoppingCartMaxQuantityExceededException() throws InstanceNotFoundException, 
		PermissionException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity = ShoppingCartItem.MAX_QUANTITY + 1;
		boolean exceptionCatched = false;
				
		try {
			shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity);
		} catch (MaxQuantityExceededException e) {
			exceptionCatched = true;
			assertEquals(ShoppingCartItem.MAX_QUANTITY, e.getMaxAllowedIncrement());
		}
		
		assertTrue(exceptionCatched);
		assertEquals(0, user.getShoppingCart().getItems().size());

		
	}
	
	@Test
	public void testAddExistingProductToShoppingCartMaxQuantityExceededException() throws InstanceNotFoundException, 
		MaxQuantityExceededException, PermissionException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity1 = 1;
		int quantity2 = ShoppingCartItem.MAX_QUANTITY;
		boolean exceptionCatched = false;
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity1);

		try {
			shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity2);
		} catch (MaxQuantityExceededException e) {
			exceptionCatched = true;
			assertEquals(ShoppingCartItem.MAX_QUANTITY-quantity1, e.getMaxAllowedIncrement());
		}
		
		assertTrue(exceptionCatched);
		
		List<ShoppingCartItem> items = new ArrayList<>(user.getShoppingCart().getItems());

		assertEquals(1, items.size());
		assertEquals(quantity1, items.get(0).getQuantity());

		
	}
	
	@Test
	public void testAddToShoppingCartMaxItemsExceededException() throws InstanceNotFoundException, 
		PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Category category = addCategory("category");
		boolean exceptionCatched = false;
		
		for (int i=0; i<ShoppingCart.MAX_ITEMS; i++) {
			Product product = addProduct("product"+i, category);
			shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), 1);
		}
				
		try {
			Product product = addProduct("product"+ShoppingCart.MAX_ITEMS, category);
			shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), 1);
		} catch (MaxItemsExceededException e) {
			exceptionCatched = true;
		}
		
		assertTrue(exceptionCatched);
		assertEquals(ShoppingCart.MAX_ITEMS, user.getShoppingCart().getItems().size());
		
	}

}
