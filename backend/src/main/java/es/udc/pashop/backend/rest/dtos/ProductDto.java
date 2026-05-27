package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;

public record ProductDto(Long id, String name, String description, BigDecimal price, Long categoryId) {}
