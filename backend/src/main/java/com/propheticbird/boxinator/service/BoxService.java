package com.propheticbird.boxinator.service;


import com.propheticbird.boxinator.dao.BoxDaoImpl;
import com.propheticbird.boxinator.model.Box;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoxService {

    @Autowired
    private BoxDaoImpl boxDaoImpl;

    private static final Map<String, Double> countryToShippingCost;
    static {
        Map<String, Double> temp = new HashMap<String, Double>();
        temp.put("Sweden", 1.3);
        temp.put("China", 4.0);
        temp.put("Brazil", 8.6);
        temp.put("Australia", 7.2);
        countryToShippingCost = Collections.unmodifiableMap(temp);
    }

    public List<Box> getAllBoxes(){
        return boxDaoImpl.getAllBoxes();
    };

    public Box insertBox(Box box) {
        return boxDaoImpl.insertBox(calculateShippingCost(box));
    };

    private Box calculateShippingCost(Box box) {
        Double shippingCost = box.getWeight() * countryToShippingCost.get(box.getDestination());
        //set a temporary id, which will be substituted with the one from the db upon insert
        return new Box(-1, box.getReceiver(), box.getWeight(), box.getColor(), box.getDestination(), shippingCost);
    }
}


