package es.udc.pashop.backend.model.entities;

import org.springframework.data.repository.CrudRepository;

public interface ProductDao extends CrudRepository<Product, Long>, CustomizedProductDao {}
