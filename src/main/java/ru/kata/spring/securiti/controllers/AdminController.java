package ru.kata.spring.securiti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.securiti.models.Role;
import ru.kata.spring.securiti.models.User;
import ru.kata.spring.securiti.repositories.RoleRepository;
import ru.kata.spring.securiti.services.UserService;
import ru.kata.spring.securiti.util.UserValidator;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final UserValidator userValidator;





    @Autowired
    public AdminController(UserService userService, RoleRepository roleRepository, UserValidator userValidator) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.userValidator = userValidator;

    }

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin/admin";
    }
    @GetMapping("/index")
    public String index(ModelMap model) {
        model.addAttribute("users", userService.findAll());
        return "admin/index";
    }
    @GetMapping("/{id}")
    public String show(@PathVariable("id") int id, ModelMap model) {
        model.addAttribute("user", userService.findOne(id));
        return "user/show";
    }
    @GetMapping("/new")
    public ModelAndView newUser() {
        User user = new User();
        ModelAndView mav = new ModelAndView("/admin/new");
        mav.addObject("user", user);
        List<Role> roles = roleRepository.findAll();
        mav.addObject("allRoles", roles);
        return mav;
    }
    @PostMapping("/new")
    public String performRegistration(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "/admin/new";
        }
        userService.save(user);
        return "redirect:/admin/";
    }
    @GetMapping("/{id}/edit")
    public ModelAndView editUser(@PathVariable(name = "id") int id) {
        User user = userService.findOne(id);
        ModelAndView mav = new ModelAndView("admin/edit");
        mav.addObject("user", user);
        List<Role> roles = roleRepository.findAll();
        mav.addObject("allRoles", roles);
        return mav;
    }
    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult, @PathVariable("id") int id) {
        if (bindingResult.hasErrors()) {
            return "admin/edit";
        }
        userService.update(id, user);
        return "redirect:/admin/index";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin/index";
    }
}

