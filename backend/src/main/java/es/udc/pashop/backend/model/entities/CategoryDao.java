package es.udc.pashop.backend.model.entities;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface CategoryDao extends PagingAndSortingRepository<Category, Long> {}
