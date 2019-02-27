package es.udc.pashop.backend.test.model.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Category;
import es.udc.pashop.backend.model.entities.CategoryDao;
import es.udc.pashop.backend.model.entities.MaxItemsExceededException;
import es.udc.pashop.backend.model.entities.MaxQuantityExceededException;
import es.udc.pashop.backend.model.entities.Order;
import es.udc.pashop.backend.model.entities.OrderDao;
import es.udc.pashop.backend.model.entities.OrderItem;
import es.udc.pashop.backend.model.entities.OrderItemDao;
import es.udc.pashop.backend.model.entities.Product;
import es.udc.pashop.backend.model.entities.ProductDao;
import es.udc.pashop.backend.model.entities.ShoppingCart;
import es.udc.pashop.backend.model.entities.ShoppingCartItem;
import es.udc.pashop.backend.model.entities.ShoppingCartItemDao;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.services.Block;
import es.udc.pashop.backend.model.services.EmptyShoppingCartException;
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
	
	@Autowired
	private ShoppingCartItemDao shoppingCartItemDao; 
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private OrderItemDao orderItemDao;
	
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
	
	private Order addOrder(User user, Product product, LocalDateTime date) {

		String postalAddress = "Postal Address";
		String postalCode = "12345";
		Order order = new Order(user, date, postalAddress, postalCode);
		OrderItem item = new OrderItem(product, product.getPrice(), 1);
		
		orderDao.save(order);
		order.addItem(item);
		orderItemDao.save(item);
		
		return order;
		
	}
	
	@Test
	public void testAddToEmptyShoppingCart() throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException,
		MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity = 2;
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity);
		
		ShoppingCart shoppingCart = user.getShoppingCart();
		Optional<ShoppingCartItem> item = shoppingCart.getItem(product.getId());
		
		assertEquals(1, shoppingCart.getItems().size());
		assertTrue(item.isPresent());
		assertEquals(quantity, item.get().getQuantity());

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
		
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		assertEquals(2, shoppingCart.getItems().size());
	
		Optional<ShoppingCartItem> item1 = shoppingCart.getItem(product1.getId());
		Optional<ShoppingCartItem> item2 = shoppingCart.getItem(product2.getId());
		
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
		
		ShoppingCart shoppingCart = user.getShoppingCart();
		Optional<ShoppingCartItem> item = shoppingCart.getItem(product.getId());
		
		assertEquals(1, shoppingCart.getItems().size());
		assertTrue(item.isPresent());
		assertEquals(quantity1 + quantity2, item.get().getQuantity());

		
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
		
		ShoppingCart shoppingCart = user.getShoppingCart();
		Optional<ShoppingCartItem> item = shoppingCart.getItem(product.getId());
		
		assertEquals(1, shoppingCart.getItems().size());
		assertTrue(item.isPresent());
		assertEquals(quantity1, item.get().getQuantity());
		
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
	
	@Test
	public void testUpdateShoppingCartItemQuantity() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		int quantity1 = 1;
		int quantity2 = 2;
		
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), quantity1);
		shoppingService.updateShoppingCartItemQuantity(user.getId(), 
			user.getShoppingCart().getId(), product.getId(), quantity2);
		
		Optional<ShoppingCartItem> item = user.getShoppingCart().getItem(product.getId());
	
		assertEquals(quantity2, item.get().getQuantity());
	
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testUpdateShoppingCartItemQuantityWithNonExistentShoppingCartId() throws InstanceNotFoundException,
		PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.updateShoppingCartItemQuantity(user.getId(), NON_EXISTENT_ID, product.getId(), 2);
		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testUpdateShoppingCartItemQuantityWithNonExistentProductId() throws InstanceNotFoundException,
		PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		
		shoppingService.updateShoppingCartItemQuantity(user.getId(), user.getShoppingCart().getId(), NON_EXISTENT_ID, 
			1);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testUpdateShoppingCartItemQuantityWithNonExistentUserId() throws InstanceNotFoundException,
		PermissionException, MaxQuantityExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.updateShoppingCartItemQuantity(NON_EXISTENT_ID, user.getShoppingCart().getId(), product.getId(), 
			1);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testUpdateShoppingCartItemQuantityToAnotherShoppingCart() throws InstanceNotFoundException,
		PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		User user1 = signUpUser("user1");
		User user2 = signUpUser("user2");
		Product product = addProduct("product");
		
		shoppingService.addToShoppingCart(user2.getId(), user2.getShoppingCart().getId(), product.getId(), 1);
		shoppingService.updateShoppingCartItemQuantity(user1.getId(), user2.getShoppingCart().getId(), product.getId(), 
			2);
		
	}
	
	@Test(expected = MaxQuantityExceededException.class)
	public void testUpdateShoppingCartItemQuantityMaxQuantityExceededException() throws InstanceNotFoundException,
		PermissionException, MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), 1);
		shoppingService.updateShoppingCartItemQuantity(user.getId(), user.getShoppingCart().getId(), product.getId(), 
			ShoppingCartItem.MAX_QUANTITY+1);
		
	}
	
	@Test
	public void removeShoppingCartItem() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		Product product1 = addProduct("product1");
		Product product2 = addProduct("product2", product1.getCategory());
		
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product1.getId(), 1);
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product2.getId(), 1);
		shoppingService.removeShoppingCartItem(user.getId(), user.getShoppingCart().getId(), product1.getId());
		
		ShoppingCart shoppingCart = user.getShoppingCart();
		
		assertFalse(shoppingCart.getItem(product1.getId()).isPresent());
		assertTrue(shoppingCart.getItem(product2.getId()).isPresent());
		assertFalse(shoppingCartItemDao.findById(product1.getId()).isPresent());
		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void removeNonExistentShoppingCartItem() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user = signUpUser("user");
		
		shoppingService.removeShoppingCartItem(user.getId(), user.getShoppingCart().getId(), NON_EXISTENT_ID);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testRemoveShoppingCartItemWithNonExistentUserId() throws InstanceNotFoundException,
		PermissionException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
		
		shoppingService.removeShoppingCartItem(NON_EXISTENT_ID, user.getShoppingCart().getId(), product.getId());
		
	}
	
	@Test(expected = PermissionException.class)
	public void removeItemFromAnotherShoppingCart() throws InstanceNotFoundException, PermissionException,
		MaxQuantityExceededException, MaxItemsExceededException {
		
		User user1 = signUpUser("user1");
		User user2 = signUpUser("user2");
		Product product = addProduct("product");
		
		shoppingService.removeShoppingCartItem(user1.getId(), user2.getShoppingCart().getId(), product.getId());
		
	}
	
	@Test
	public void testBuyAndFindOrder() throws InstanceNotFoundException, PermissionException, MaxQuantityExceededException,
		MaxItemsExceededException, EmptyShoppingCartException {
		
		User user = signUpUser("user");
		Product product1 = addProduct("product1");
		Product product2 = addProduct("product2", product1.getCategory());
		int quantity1 = 1;
		int quantity2 = 2;
		String postalAddress = "Postal Address";
		String postalCode = "12345";
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product1.getId(), quantity1);
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product2.getId(), quantity2);
		
		Order order = shoppingService.buy(user.getId(), user.getShoppingCart().getId(), postalAddress, postalCode);	
		Order foundOrder = shoppingService.findOrder(user.getId(), order.getId());
		
		assertEquals(order, foundOrder);
		assertEquals(user, order.getUser());
		assertEquals(postalAddress, order.getPostalAddress());
		assertEquals(postalCode, order.getPostalCode());	
		assertEquals(2, order.getItems().size());
		
		Optional<OrderItem> item1 = order.getItem(product1.getId());
		Optional<OrderItem> item2 = order.getItem(product2.getId());
		
		assertTrue(item1.isPresent());
		assertEquals(product1.getPrice(), item1.get().getProductPrice());
		assertEquals(quantity1, item1.get().getQuantity());
		assertTrue(item2.isPresent());
		assertEquals(product2.getPrice(), item2.get().getProductPrice());
		assertEquals(quantity2, item2.get().getQuantity());
		assertTrue(user.getShoppingCart().isEmpty());
		
	}
	 
	@Test(expected = InstanceNotFoundException.class)
	public void testBuyWithNonExistingShoppingCart() throws InstanceNotFoundException, PermissionException,
		EmptyShoppingCartException {
		
		User user = signUpUser("user");
		
		shoppingService.buy(user.getId(), NON_EXISTENT_ID, "Postal Address", "12345");
		
	}
	
	@Test(expected = PermissionException.class)
	public void testBuyAnotherShoppingCart() throws InstanceNotFoundException, PermissionException,
		EmptyShoppingCartException {
		
		User user1 = signUpUser("user1");
		User user2 = signUpUser("user2");
		
		shoppingService.buy(user1.getId(), user2.getShoppingCart().getId(), "Postal Address", "12345");
		
	}
	
	@Test(expected = PermissionException.class)
	public void testBuyWithNonExistentUserId() throws InstanceNotFoundException, PermissionException,
		EmptyShoppingCartException {
		
		User user = signUpUser("user");
		
		shoppingService.buy(NON_EXISTENT_ID, user.getShoppingCart().getId(), "Postal Address", "12345");
		
	}
	
	@Test(expected = EmptyShoppingCartException.class)
	public void testBuyEmptyShoppingCart() throws InstanceNotFoundException, PermissionException,
		EmptyShoppingCartException {
		
		User user = signUpUser("user");
		
		shoppingService.buy(user.getId(), user.getShoppingCart().getId(), "Postal Address", "12345");
		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testFindNonExistentOrder() throws InstanceNotFoundException, PermissionException {
		
		User user = signUpUser("user");
		
		shoppingService.findOrder(user.getId(), NON_EXISTENT_ID);
		
	}
	
	@Test(expected = PermissionException.class)
	public void testFindOrderOfAnotherUser() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException, EmptyShoppingCartException {
		
		User user1 = signUpUser("user1");
		User user2 = signUpUser("user2");		
		Product product = addProduct("product");
				
		shoppingService.addToShoppingCart(user1.getId(), user1.getShoppingCart().getId(), product.getId(), 1);
		
		Order order = shoppingService.buy(user1.getId(), user1.getShoppingCart().getId(), "Postal Address", "12345");	
		
		shoppingService.findOrder(user2.getId(), order.getId());
		
	}
	
	@Test(expected = PermissionException.class)
	public void testFindOrderWithNonExistingUserId() throws InstanceNotFoundException, PermissionException, 
		MaxQuantityExceededException, MaxItemsExceededException, EmptyShoppingCartException {
		
		User user = signUpUser("user");
		Product product = addProduct("product");
				
		shoppingService.addToShoppingCart(user.getId(), user.getShoppingCart().getId(), product.getId(), 1);
		
		Order order = shoppingService.buy(user.getId(), user.getShoppingCart().getId(), "Postal Address", "12345");	
		
		shoppingService.findOrder(NON_EXISTENT_ID, order.getId());
		
	}
	
	@Test
	public void testFindNoOrders() {
		
		User user = signUpUser("user");
		Block<Order> expectedOrders = new Block<>(new ArrayList<>(), false);
		
		assertEquals(expectedOrders, shoppingService.findOrders(user.getId(), 0, 1));
		
	}
	
	@Test
	public void testFindOrders() {

		Product product = addProduct("product");
		User user = signUpUser("user");
		Order order1 = addOrder(user, product, LocalDateTime.of(2017, 10, 1, 10, 2, 3));
		Order order2 = addOrder(user, product, LocalDateTime.of(2018, 11, 1, 10, 2, 3));
		Order order3 = addOrder(user, product, LocalDateTime.of(2018, 12, 1, 10, 2, 3));

		Block<Order> expectedBlock = new Block<>(Arrays.asList(order3, order2), true);
		assertEquals(expectedBlock, shoppingService.findOrders(user.getId(), 0, 2));
		
		expectedBlock = new Block<>(Arrays.asList(order1), false);
		assertEquals(expectedBlock, shoppingService.findOrders(user.getId(), 1, 2));
		
	}

}
