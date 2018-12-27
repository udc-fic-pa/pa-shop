package es.udc.pashop.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.pashop.backend.model.entities.Order;

public class OrderConversor {
	
	private OrderConversor() {}
	
	public final static List<OrderSummaryDto> toOrderSummaryDtos(List<Order> orders) {
		return orders.stream().map(o -> toOrderSummaryDto(o)).collect(Collectors.toList());
	}
	
	private final static OrderSummaryDto toOrderSummaryDto(Order order) {
		return new OrderSummaryDto(order.getId(), order.getDate());
	}

}
