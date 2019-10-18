package com.propheticbird.boxinator.model;

import com.propheticbird.boxinator.model.Box;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BoxTest {
    public BoxTest() {
    }

    @Test
    public void testObjectCreation(){
        int boxId = 22;
        String receiver = "John";
        Double weight = 22.3;
        String color = "#ff00ff";
        String destination = "Sweden";
        Double shippingCost = 0.0;

        Box box = new Box(boxId, receiver, weight, color, destination, shippingCost);
        assertThat(box.getId()).isEqualTo(boxId);
        assertThat(box.getReceiver()).isEqualTo(receiver);
        assertThat(box.getWeight()).isEqualTo(weight);
        assertThat(box.getColor()).isEqualTo(color);
        assertThat(box.getDestination()).isEqualTo(destination);
        assertThat(box.getShippingCost()).isEqualTo(shippingCost);
    }
}
