package es.udc.pashop.backend.model.entities;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class CustomizedProductDaoImpl implements CustomizedProductDao {
	
	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Product> find(Long categoryId, String text, int startIndex, int count) {
		
		String[] keywords = text == null ? new String[0] : text.split("\\s");
		String queryString = "SELECT p FROM Product p";
		
		if (categoryId != null || keywords.length > 0) {
			queryString += " WHERE ";
		}
		
		if (categoryId != null) {
			queryString += "p.category.id = :categoryId";
		}
		
		if (keywords.length != 0) {
			
			if (categoryId != null) {
				queryString += " AND ";
			}
			
			for (int i = 0; i<keywords.length-1; i++) {
				queryString += "LOWER(p.name) LIKE LOWER(:keyword" + i + ") AND ";
			}
			
			queryString += "LOWER(p.name) LIKE LOWER(:keyword" + (keywords.length-1) + ")";
			
		}
		
		queryString += " ORDER BY p.name";
		
		Query query = entityManager.createQuery(queryString).setFirstResult(startIndex).setMaxResults(count);
		
		if (categoryId != null) {
			query.setParameter("categoryId", categoryId);
		}
		
		if (keywords.length != 0) {
			for (int i = 0; i<keywords.length; i++) {
				query.setParameter("keyword" + i, '%' + keywords[i] + '%');
			}
	
		}
		
		return query.getResultList();
		
	}

}
