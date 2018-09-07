package es.udc.pashop.backend.model.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.pashop.backend.model.common.exceptions.DuplicateInstanceException;
import es.udc.pashop.backend.model.common.exceptions.InstanceNotFoundException;
import es.udc.pashop.backend.model.entities.Project;
import es.udc.pashop.backend.model.entities.ProjectDao;
import es.udc.pashop.backend.model.entities.Task;
import es.udc.pashop.backend.model.entities.TaskDao;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private ProjectDao projectDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Task> findTasks(Long userId, Long projectId) throws PermissionException, InstanceNotFoundException {
		
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkProjectExistsAndBelongsTo(projectId, userId);

		return taskDao.findByProjectIdOrderById(projectId);
	
	}

	@Override
	public Task addTask(Long userId, Long projectId, Task task) 
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException {
		
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkProjectExistsAndBelongsTo(projectId, userId);
		
		Optional<Project> project = projectDao.findById(projectId);
		
		checkExistingTask(projectId, task.getName());
		task.setProject(project.get());
		
		return taskDao.save(task);
		
	}

	@Override
	public void removeTask(Long userId, Long taskId) throws PermissionException, InstanceNotFoundException {
				
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkTaskExistsAndBelongsTo(taskId, userId);
		
		taskDao.deleteById(taskId);
		
	}

	@Override
	public Task updateTaskPartial(Long userId, Long taskId, Map<String, Object> updates) 
		throws PermissionException, InstanceNotFoundException, DuplicateInstanceException {
		
		permissionChecker.checkUserExists(userId);
		permissionChecker.checkTaskExistsAndBelongsTo(taskId, userId);
		
		Optional<Task> task = taskDao.findById(taskId);
		String name = (String) updates.get("name");
		
		if (name != null && !task.get().getName().equalsIgnoreCase(name)) {

			checkExistingTask(task.get().getProject().getId(), name);
			task.get().setName(name);
			
		}
		
		Boolean completed = (Boolean) updates.get("completed");
		
		if (completed != null && !completed.equals(task.get().isCompleted())) {
			task.get().setCompleted(completed);
		}
		
		return task.get();
		
	}
	
	private void checkExistingTask(Long projectId, String name) throws DuplicateInstanceException {
		
		if (taskDao.existsByProjectIdAndNameIgnoreCase(projectId, name)) {
			throw new DuplicateInstanceException("project.entities.task", name);
		}
		
	}
	
}
