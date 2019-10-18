package com.propheticbird.boxinator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.propheticbird.boxinator.model.Box;
import com.propheticbird.boxinator.service.BoxService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static com.sun.tools.doclint.Entity.times;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(BoxController.class)
public class BoxControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    protected WebApplicationContext wac;

    @Autowired
    BoxController boxController;

    @MockBean
    BoxService boxService;

    private List<Box> boxes;

    @Test
    public void fetchingBoxesShouldReturnSuccess() throws Exception {

        String expectedContent = String.join(
                System.getProperty("line.separator"),
                "[",
                    "{",
                        "\"id\": 1,",
                        "\"receiver\": \"John\",",
                        "\"weight\": 33.2,",
                        "\"color\": \"#ff00ff\",",
                        "\"destination\": \"Sweden\",",
                        "\"shippingCost\": 0.0",
                    "},",
                    "{",
                        "\"id\": 2,",
                        "\"receiver\": \"Jill\",",
                        "\"weight\": 1.1,",
                        "\"color\": \"#ab12fa\",",
                        "\"destination\": \"China\",",
                        "\"shippingCost\": 22.0",
                    "}",
                "]"
        );

        ArrayList<Box> boxes = new ArrayList<Box>();
        boxes.add(new Box(1, "John", 33.2, "#ff00ff", "Sweden", 0.0));
        boxes.add(new Box(2, "Jill", 1.1, "#ab12fa", "China", 22.0));

        when(boxService.getAllBoxes()).thenReturn(boxes);
        this.mockMvc.perform(get("/boxes"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedContent));
    }

    @Test
    public void fetchingBoxesFromAnEmptyDataStoreShouldReturnEmptyArray() throws Exception {
        ArrayList<Box> boxes = new ArrayList<Box>();
        when(boxService.getAllBoxes()).thenReturn(boxes);
        this.mockMvc.perform(get("/boxes"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    public void addingBoxShallReturnTheSameBoxWithIdAndShippingCost() throws Exception {
        String boxJsonFromBackend = String.join(
                System.getProperty("line.separator"),
                "{",
                    "\"id\": 1,",
                    "\"receiver\": \"John\",",
                    "\"weight\": 33.2,",
                    "\"color\": \"#ffffff\",",
                    "\"destination\": \"Sweden\",",
                    "\"shippingCost\": 98.2",
                "}"
        );

        when(boxService.insertBox((any(Box.class))))
                .thenReturn(new Box(1, "John", 33.2, "#ffffff", "Sweden", 98.2));

        Box box = new Box("John", 33.2, "#ffffff", "Sweden");


        this.mockMvc.perform(
                post("/boxes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(box))
                .characterEncoding("utf-8")
                .accept(MediaType.ALL)
        )
                .andExpect(status().isOk())
                .andExpect(content().json(boxJsonFromBackend))
                .andReturn();

        verify(boxService, times(1)).insertBox(any(Box.class));
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
