package com.propheticbird.boxinator.controller;

import com.propheticbird.boxinator.model.Box;
import com.propheticbird.boxinator.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/boxes")
@CrossOrigin(origins = { "http://localhost:8080" })
public class BoxController {
    @Autowired
    BoxService boxService;

    @GetMapping
    public List<Box> getAllBoxes() {
        return boxService.getAllBoxes();
    }

    @PostMapping
    public Box addBox(@Valid @RequestBody Box box ) {
        return boxService.insertBox(box);
    }
}
