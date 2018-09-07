package es.udc.pashop.backend.model.services;

import java.util.List;
import java.util.Map;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Task;

public interface TaskService {
	
	public List<Task> findTasks(Long userId, Long projectId) throws PermissionException, InstanceNotFoundException;
		
	public Task addTask(Long userId, Long projectId, Task task) 
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException;
	
	public void removeTask(Long userId, Long taskId) throws PermissionException, InstanceNotFoundException;
	
	public Task updateTaskPartial(Long userId, Long taskId, Map<String, Object> updates)
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException;
		
}
