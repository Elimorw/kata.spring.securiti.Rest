package ru.kata.spring.securiti.util;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.kata.spring.securiti.models.User;
import ru.kata.spring.securiti.services.UserService;

@Component
public class UserValidator implements Validator {

    private final UserService userServiceImpl;

    public UserValidator(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        try {
            userServiceImpl.loadUserByUsername(user.getUserName());
        } catch (UsernameNotFoundException ignored) {
            return;
        }
        errors.rejectValue("username", "", "Человек с таким именем уже существует");
    }
}
