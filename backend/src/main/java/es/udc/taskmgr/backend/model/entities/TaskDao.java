package es.udc.taskmgr.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskDao extends PagingAndSortingRepository<Task, Long> {
	
	List<Task> findByProjectIdOrderById(Long projectId);

	boolean existsByProjectIdAndNameIgnoreCase(Long projectId, String name);
	
}
