package com.propheticbird.boxinator.dao;

import com.propheticbird.boxinator.model.Box;

import java.util.List;

public interface BoxDao {
    List<Box> getAllBoxes();
    Box insertBox(Box box);
}
