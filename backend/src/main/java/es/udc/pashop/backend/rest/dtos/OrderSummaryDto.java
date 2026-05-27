package es.udc.pashop.backend.rest.dtos;

import java.time.LocalDateTime;

public record OrderSummaryDto(Long id, LocalDateTime date) {}
