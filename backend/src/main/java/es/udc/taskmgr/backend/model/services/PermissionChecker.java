package es.udc.taskmgr.backend.model.services;

import es.udc.taskmgr.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.taskmgr.backend.model.entities.User;

public interface PermissionChecker {
	
	public void checkUserExists(Long userId) throws InstanceNotFoundException;
	
	public User checkUser(Long userId) throws InstanceNotFoundException;

	public void checkProjectExistsAndBelongsTo(Long projectId, Long userId)
		throws PermissionException, InstanceNotFoundException;
	
	public void checkTaskExistsAndBelongsTo(Long taskId, Long userId)
		throws PermissionException, InstanceNotFoundException;
	
}
