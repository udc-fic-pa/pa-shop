package es.udc.pashop.backend.model.entities;

import org.springframework.data.repository.CrudRepository;

public interface OrderItemDao extends CrudRepository<OrderItem, Long> {}
