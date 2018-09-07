package es.udc.pashop.backend.model.services;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Project;
import es.udc.pashop.backend.model.entities.ProjectDao;
import es.udc.pashop.backend.model.entities.User;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private ProjectDao projectDao;

	@Override
	public Project addProject(Long userId, Project project) throws DuplicateInstanceException,
		InstanceNotFoundException {
		
		User user = permissionChecker.checkUser(userId);

		checkExistingProject(userId, project.getName());
		project.setUser(user);
		
		return projectDao.save(project);
		
	}

	@Override
	public void removeProject(Long userId, Long projectId) throws PermissionException, InstanceNotFoundException {
		
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkProjectExistsAndBelongsTo(projectId, userId);
		
		projectDao.deleteById(projectId);
		
	}

	@Override
	public Project updateProjectPartial(Long userId, Long projectId, Map<String, Object> updates) 
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException {
		
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkProjectExistsAndBelongsTo(projectId, userId);
		
		Optional<Project> project = projectDao.findById(projectId);
		
		String name = (String) updates.get("name");
		
		if (name != null) {
			
			name = name.trim();
			
			if (!project.get().getName().equalsIgnoreCase(name)) {
				checkExistingProject(userId, name);
				project.get().setName(name);
			}
			
		}
		
		return project.get();
		
	}
	
	
	private void checkExistingProject(Long userId, String name) throws DuplicateInstanceException {
		
		if (projectDao.existsByUserIdAndNameIgnoreCase(userId, name)) {
			throw new DuplicateInstanceException("project.entities.project", name);
		}
		
	}

}
