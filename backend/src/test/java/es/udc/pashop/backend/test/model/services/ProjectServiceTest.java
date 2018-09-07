package es.udc.pashop.backend.test.model.services;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.User;
import es.udc.pashop.backend.model.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ProjectServiceTest {
	
	@Autowired
	private UserService userService;
	
	private User createUser(String userName) {
		return new User(userName, userName, userName, userName, userName + "@" + userName + ".com");
	}
	
	@Test
	public void testAddProject() throws DuplicateInstanceException, InstanceNotFoundException {
		
//		User user = createUser("test");
//		Project project = createProject("test");
//		
//		userService.signUp(user);
//		projectService.addProject(user.getId(), project);
//		
//		Optional<Project> projectFound = projectDao.findById(project.getId());
//		
//		assertTrue(projectFound.isPresent());
//		assertEquals(project, projectFound.get());
		
	}

}
