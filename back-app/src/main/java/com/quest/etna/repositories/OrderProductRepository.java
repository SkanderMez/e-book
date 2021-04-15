package com.quest.etna.repositories;

import com.quest.etna.model.OrderProduct;
import com.quest.etna.model.OrderProductPK;
import com.quest.etna.model.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderProductRepository extends CrudRepository<OrderProduct, OrderProductPK> {
    List<OrderProduct> findAllByPkOrderId(Long orderId);
}
