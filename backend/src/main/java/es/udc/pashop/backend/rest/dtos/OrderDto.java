package es.udc.pashop.backend.rest.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(Long id, List<OrderItemDto> items, LocalDateTime date, BigDecimal totalPrice,
	String postalAddress, String postalCode) {}
