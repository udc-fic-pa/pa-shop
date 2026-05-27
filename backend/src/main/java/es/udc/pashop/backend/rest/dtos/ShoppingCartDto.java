package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;
import java.util.List;

public record ShoppingCartDto(Long id, List<ShoppingCartItemDto> items, int totalQuantity, BigDecimal totalPrice) {}
