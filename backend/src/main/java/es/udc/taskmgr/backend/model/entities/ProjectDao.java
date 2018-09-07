package es.udc.taskmgr.backend.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProjectDao extends PagingAndSortingRepository<Project, Long> {
	
	List<Project> findByUserIdOrderByIdAsc(Long userId);
	
	boolean existsByUserIdAndNameIgnoreCase(Long userId, String name);
	
}
