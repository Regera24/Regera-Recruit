package org.group5.regerarecruit.utils.custom_validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.group5.regerarecruit.utils.custom_constraint.PhoneNumberConstraint;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumberConstraint, String> {
    @Override
    public void initialize(PhoneNumberConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext constraintValidatorContext) {
        if (phone == null) return false;
        if (!phone.matches("^(03|05|07|08|09)\\d{8}$")) return false;
        return true;
    }
}
