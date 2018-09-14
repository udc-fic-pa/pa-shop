package es.udc.pashop.backend.model.entities;

import java.util.List;

public interface CustomizedProductDao {
	
	List<Product> find(Long categoryId, String text, int startIndex, int count);

}
