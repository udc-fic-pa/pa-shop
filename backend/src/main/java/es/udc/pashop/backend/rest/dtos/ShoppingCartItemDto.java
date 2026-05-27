package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;

public record ShoppingCartItemDto(Long productId, String productName, Long categoryId, BigDecimal productPrice,
	int quantity) {}
