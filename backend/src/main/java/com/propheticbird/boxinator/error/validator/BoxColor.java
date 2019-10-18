package com.propheticbird.boxinator.error.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = BoxColorValidator.class)
@Documented
public @interface BoxColor {

    String message() default "Blue color boxes are out of stock.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
