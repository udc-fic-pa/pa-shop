package es.udc.pashop.backend.rest.dtos;

import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import es.udc.pashop.backend.model.entities.Order;
import es.udc.pashop.backend.model.entities.OrderItem;

public class OrderConversor {
	
	private OrderConversor() {}
	
	public final static List<OrderSummaryDto> toOrderSummaryDtos(List<Order> orders) {
		return orders.stream().map(o -> toOrderSummaryDto(o)).collect(Collectors.toList());
	}
	
	public final static OrderDto toOrderDto(Order order) {
		
		List<OrderItemDto> items = order.getItems().stream().map(i -> toOrderItemDto(i)).collect(Collectors.toList());
		
		return new OrderDto(order.getId(), items, order.getDate(), order.getPostalAddress(), order.getPostalCode());
		
	}
	
	private final static OrderSummaryDto toOrderSummaryDto(Order order) {
		
		 return new OrderSummaryDto(order.getId(), 
		     order.getDate().truncatedTo(ChronoUnit.MINUTES).atZone(ZoneOffset.systemDefault()).toInstant().toEpochMilli());
		 
	}
	
	private final static OrderItemDto toOrderItemDto(OrderItem item) {
		
		return new OrderItemDto(item.getId(), item.getProduct().getId(), item.getProduct().getName(), item.getPrice(),
			item.getQuantity());
		
	}

}
