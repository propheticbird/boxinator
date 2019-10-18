package com.propheticbird.boxinator.error.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.awt.Color;

public class BoxColorValidator implements ConstraintValidator <BoxColor, String> {

    private static final int LOWEST_BLUE_SHADE = 180;
    private static final int HIGHEST_BLUE_SHADE = 255;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        Color color = Color.decode(value);
        float[] hsb = Color.RGBtoHSB(color.getRed(), color.getGreen(), color.getBlue(), null);
        int hue = convertHueFromFloatToDegrees(hsb[0]);
        return !isBlue(hue);
    }

    private int convertHueFromFloatToDegrees(float hue) {

        /**
         * Hue is a shade of a color and expressed in degrees (from 0 to 360) in HSV model.
         * Color class from awt package represents hue as floating-point number. Thus we need to convert it to degrees.
         * In order to do it the floor of this number is subtracted from itself to create a fraction between 0 and 1.
         * This fractional number is then multiplied by 360 to produce the hue angle in the HSB color model.
        */
        return (int)Math.round((hue - Math.floor(hue)) * 360);
    }

    private boolean isBlue(int hue) {
        return hue > LOWEST_BLUE_SHADE && hue < HIGHEST_BLUE_SHADE;
    }
}
