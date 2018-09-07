package es.udc.pashop.backend.test.model.services;

import static org.junit.Assert.assertEquals;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.services.IncorrectLoginException;
import es.udc.pashop.backend.model.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserServiceTest {
	
	private final Long NON_EXISTENT_USER_ID = new Long(-1);
	
	@Autowired
	private UserService userService;
	
	private User createUser(String userName) {
		return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
	}
	
	@Test
	public void testSignUpAndLoginFromId() throws DuplicateInstanceException, InstanceNotFoundException {
		
		User signedUpUser = userService.signUp(createUser("test"));
		User loggedInUser = userService.loginFromId(signedUpUser.getId());
		
		assertEquals(signedUpUser, loggedInUser);
		
	}
	
	@Test(expected = DuplicateInstanceException.class)
	public void testSignUpDuplicatedUserName() throws DuplicateInstanceException {
		
		User user = createUser("test");
		
		userService.signUp(user);
		userService.signUp(user);
		
	}
	
	@Test(expected = InstanceNotFoundException.class)
	public void testloginFromNonExistentId() throws InstanceNotFoundException {		
		userService.loginFromId(NON_EXISTENT_USER_ID);
	}
	
	@Test
	public void testLogin() throws DuplicateInstanceException, IncorrectLoginException {
		
		User user = createUser("test");
				
		User signedUpUser = userService.signUp(user);
		User loggedInUser = userService.login(user.getUserName(), user.getPassword());
		
		assertEquals(signedUpUser, loggedInUser);
		
	}
	
	@Test(expected = IncorrectLoginException.class)
	public void testLoginWithIncorrectPassword() throws DuplicateInstanceException, IncorrectLoginException {
		
		User user = createUser("test");
		
		userService.signUp(user);
		userService.login(user.getUserName(), 'X' + user.getPassword());
		
	}
	
	@Test
	public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException {
		
		User signedUpUser = userService.signUp(createUser("user"));
		
		signedUpUser.setFirstName('X' + signedUpUser.getFirstName());
		signedUpUser.setLastName('X' + signedUpUser.getLastName());
		signedUpUser.setEmail('X' + signedUpUser.getEmail());
		
		userService.updateProfile(signedUpUser);
		User updatedUser = userService.loginFromId(signedUpUser.getId());
		
		assertEquals(signedUpUser, updatedUser);
		
	}

}





















