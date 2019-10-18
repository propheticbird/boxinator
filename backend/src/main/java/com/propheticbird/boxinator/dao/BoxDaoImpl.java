package com.propheticbird.boxinator.dao;

import com.propheticbird.boxinator.model.Box;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BoxDaoImpl implements BoxDao {

    private Connection connection;

    public BoxDaoImpl(@Value("${spring.datasource.url}") String URL, @Value("${spring.datasource.username}") String username, @Value("${spring.datasource.password}") String password) {
        try {
            connection = DriverManager.getConnection(URL, username, password);
        } catch (SQLException e) {
            System.out.println("Connection error when accessing db.");
        }
    }

    @Override
    public List<Box> getAllBoxes() {
        String sql = "select * from boxes";

        ArrayList<Box> boxes = new ArrayList<Box>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);){
            ResultSet result = preparedStatement.executeQuery(sql);

            while(result.next()) {
                boxes.add(new Box(
                        result.getInt(1),
                        result.getString(2),
                        result.getDouble(3),
                        result.getString(4),
                        result.getString(5),
                        result.getDouble(6)
                ));
            }

        } catch (SQLException e) {
            System.out.println("Could not fetch boxes from the db: " + e);
        }

        return boxes;
    }

    @Override
    public Box insertBox(Box box) {
        String sql = "insert into boxes (receiver, weight, color, destination, shippingCost) VALUES (?, ?, ?, ?, ?)";

        try {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, box.getReceiver());
            statement.setDouble(2, box.getWeight());
            statement.setString(3, box.getColor());
            statement.setString(4, box.getDestination());
            statement.setDouble(5, box.getShippingCost());

            int affectedRows = statement.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating user failed, no ID obtained");
            }

            //fetch id of the box after insert
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    box.setId(generatedKeys.getInt(1));
                }
                else {
                    throw new SQLException("Creating user failed, no ID obtained.");
                }
            }
        } catch (SQLException e) {
            System.out.println("Could not insert boxes into the db: " + e);
        }

        return box;
    }
}
