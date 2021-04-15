package com.quest.etna.service;

import com.quest.etna.model.OrderProduct;
import com.quest.etna.repositories.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrderProductService {

    @Autowired
    private OrderProductRepository orderProductRepository;


    public List<OrderProduct> findAllByOrderId(Long orderId){
        return orderProductRepository.findAllByPkOrderId(orderId);

    }
    public OrderProduct create(OrderProduct orderProduct) {
        return this.orderProductRepository.save(orderProduct);
    }
}