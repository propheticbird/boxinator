package com.propheticbird.boxinator.model;

import com.propheticbird.boxinator.error.validator.BoxColor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

public class Box {

    private int id;

    @NotEmpty(message = "Please specify receiver name")
    private String receiver;

    @Positive(message = "Weight cannot be a negative number or zero")
    private Double weight;

    @BoxColor
    @NotEmpty(message = "Please select color")
    private String color;

    @NotEmpty(message = "Please specify destination")
    private String destination;

    private Double shippingCost;

    private Box(){}

    public Box(int id, String receiver, Double weight, String color, String destination, Double shippingCost) {
        this.id = id;
        this.receiver = receiver;
        this.weight = weight;
        this.color = color;
        this.destination = destination;
        this.shippingCost = shippingCost;
    }

    public Box(String receiver, Double weight, String color, String destination) {
        this.receiver = receiver;
        this.weight = weight;
        this.color = color;
        this.destination = destination;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
