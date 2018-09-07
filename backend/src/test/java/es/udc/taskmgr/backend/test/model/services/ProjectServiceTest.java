package es.udc.taskmgr.backend.test.model.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import es.udc.taskmgr.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.taskmgr.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.taskmgr.backend.model.entities.Project;
import es.udc.taskmgr.backend.model.entities.ProjectDao;
import es.udc.taskmgr.backend.model.entities.User;
import es.udc.taskmgr.backend.model.services.ProjectService;
import es.udc.taskmgr.backend.model.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest({"taskmgr.jwt.signKey=mock", "taskmgr.jwt.expirationMinutes=0"})
@Transactional
public class ProjectServiceTest {
	
	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private UserService userService;
	
	private Project createProject(String projectName) {
		return new Project(projectName);
	}
	
	private User createUser(String userName) {
		return new User(userName, userName, userName, userName, userName + "@" + userName + ".com");
	}
	
	@Test
	public void testAddProject() throws DuplicateInstanceException, InstanceNotFoundException {
		
		User user = createUser("test");
		Project project = createProject("test");
		
		userService.signUp(user);
		projectService.addProject(user.getId(), project);
		
		Optional<Project> projectFound = projectDao.findById(project.getId());
		
		assertTrue(projectFound.isPresent());
		assertEquals(project, projectFound.get());
		
	}

}
