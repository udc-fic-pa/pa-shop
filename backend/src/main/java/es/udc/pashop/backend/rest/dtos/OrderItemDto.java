package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;

public record OrderItemDto(Long id, Long productId, String productName, BigDecimal productPrice, int quantity) {}
