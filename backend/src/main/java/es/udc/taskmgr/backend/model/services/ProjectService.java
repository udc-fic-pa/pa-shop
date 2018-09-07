package es.udc.taskmgr.backend.model.services;

import java.util.Map;

import es.udc.taskmgr.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.taskmgr.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.taskmgr.backend.model.entities.Project;

public interface ProjectService {
	
	public Project addProject(Long userId, Project project) throws DuplicateInstanceException, 
		InstanceNotFoundException;
	
	public void removeProject(Long userId, Long id) throws PermissionException, InstanceNotFoundException;
	
	Project updateProjectPartial(Long userId, Long id, Map<String, Object> updates)
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException;
	
}
