package com.myApp.ecommerce.services.PaymentService;

import com.myApp.ecommerce.dtos.Cart.CartDto;
import com.myApp.ecommerce.dtos.Payment.MyOrderDto;
import com.myApp.ecommerce.dtos.Payment.OrderInfoDto;
import com.myApp.ecommerce.dtos.user.UserDto;
import com.myApp.ecommerce.models.payment.MyOrder;
import com.myApp.ecommerce.models.user.User;
import com.myApp.ecommerce.repositorys.OrderInfoRepository;
import com.myApp.ecommerce.repositorys.OrderRepository;
import com.myApp.ecommerce.services.Cart.CartService;
import com.myApp.ecommerce.services.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myApp.ecommerce.models.payment.OrderInfo;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderInfoRepository orderInfoRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    public OrderInfoDto insertOrderInfo(OrderInfo orderInfo) {
        OrderInfo savedOrderInfo = orderInfoRepository.save(orderInfo);
        User user = userService.getUserById(savedOrderInfo.getId());
        UserDto userDto = modelMapper.map(user, UserDto.class);
        OrderInfoDto orderInfoDto = new OrderInfoDto();
        orderInfoDto.setId(savedOrderInfo.getId());
        orderInfoDto.setUserDto(userDto);
        orderInfoDto.setAddress(savedOrderInfo.getAddress());
        orderInfoDto.setStatus(savedOrderInfo.getStatus());
        orderInfoDto.setTotal(savedOrderInfo.getTotal());
        orderInfoDto.setDate(savedOrderInfo.getDate());
        orderInfoDto.setPhoneContact(savedOrderInfo.getPhoneContact());
        return orderInfoDto;
    }

    public List<OrderInfoDto> getAllOrderInfo() {
        List<OrderInfo> orderInfos = orderInfoRepository.findAll();
        List<OrderInfoDto> orderInfoDtos = new ArrayList<OrderInfoDto>();
        for (OrderInfo orderInfo : orderInfos
        ) {
            User user = userService.getUserById(orderInfo.getId());
            UserDto userDto = modelMapper.map(user, UserDto.class);
            OrderInfoDto orderInfoDto = new OrderInfoDto();
            orderInfoDto.setId(orderInfo.getId());
            orderInfoDto.setUserDto(userDto);
            orderInfoDto.setAddress(orderInfo.getAddress());
            orderInfoDto.setStatus(orderInfo.getStatus());
            orderInfoDto.setTotal(orderInfo.getTotal());
            orderInfoDto.setDate(orderInfo.getDate());
            orderInfoDto.setPhoneContact(orderInfo.getPhoneContact());
            orderInfoDtos.add(orderInfoDto);
        }
        return orderInfoDtos;
    }
    public List<MyOrderDto> insertOrder(Long idOrderInfo, Long[] idsCart ){

        List<CartDto> cartDtos = new ArrayList<CartDto>();
        for (Long id: idsCart
             ) {
            CartDto cartDto = cartService.getCartById(id);
            if(cartDto == null){
                continue;
            }
            cartDtos.add(cartDto);
        }
        List<MyOrderDto> myOrderDtos = new ArrayList<MyOrderDto>();
        for (CartDto cartDto: cartDtos
             ) {
            MyOrder order = new MyOrder();
            order.setOrderInfoId(idOrderInfo);
            order.setCartId(cartDto.getId());
            MyOrder savedOrder = orderRepository.save(order);
            MyOrderDto myOrderDto = new MyOrderDto();
            myOrderDto.setId(savedOrder.getId());
            myOrderDto.setOrderInfoId(idOrderInfo);
            myOrderDto.setCartDto(cartDto);
            myOrderDtos.add(myOrderDto);
        }
        return myOrderDtos;
    }
    public List<MyOrderDto> getCartsByIdOrderInfo(Long idOrderInfo){
        List<MyOrder> orders = orderRepository.findByOrderInfoId(idOrderInfo);
        List<MyOrderDto> myOrderDtos = new ArrayList<MyOrderDto>();
        for (MyOrder order : orders
             ) {
            CartDto cartDto = cartService.getCartById(order.getCartId());
            if(cartDto == null){
                continue;
            }
            MyOrderDto myOrderDto = new MyOrderDto();
            myOrderDto.setId(order.getId());
            myOrderDto.setCartDto(cartDto);
            myOrderDto.setOrderInfoId(order.getOrderInfoId());
            myOrderDtos.add(myOrderDto);
        }
        return myOrderDtos;
    }
    public List<OrderInfoDto> getOrderInfosByUserId(Long idUser){
        List<OrderInfo> orderInfos = orderInfoRepository.findByUserId(idUser);
        List<OrderInfoDto> orderInfoDtos = new ArrayList<OrderInfoDto>();
        for (OrderInfo orderInfo : orderInfos
        ) {
            User user = userService.getUserById(orderInfo.getId());
            UserDto userDto = modelMapper.map(user, UserDto.class);
            OrderInfoDto orderInfoDto = new OrderInfoDto();
            orderInfoDto.setId(orderInfo.getId());
            orderInfoDto.setUserDto(userDto);
            orderInfoDto.setAddress(orderInfo.getAddress());
            orderInfoDto.setStatus(orderInfo.getStatus());
            orderInfoDto.setTotal(orderInfo.getTotal());
            orderInfoDto.setDate(orderInfo.getDate());
            orderInfoDto.setPhoneContact(orderInfo.getPhoneContact());
            orderInfoDtos.add(orderInfoDto);
        }
        return orderInfoDtos;
    }
}
