package com.klef.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.back.model.Function;
import com.klef.back.service.FunctionService;

@CrossOrigin
@RestController
@RequestMapping("/adminfunc")
public class AdminController {

    @Autowired
    private FunctionService functionService;

   
    @PostMapping("/bookfunc")
    public String bookFunction(@RequestBody Function function) {
        return functionService.bookFunc(function);
    }

    @GetMapping("/viewfunc")
    public List<Function> viewAllFunctions() {
        return functionService.viewallfunctions();
    }

    @GetMapping("/func/{id}")
    public Function getFunctionById(@PathVariable("id") int f_id) {
        return functionService.getFunctionById(f_id);
    }
    @PutMapping("/updatefunc/{id}")
    public String updateFunction(@PathVariable int id, @RequestBody Function function) {
        return functionService.updateFunction(id, function);
    }


    @DeleteMapping("/deletefunc/{id}")
    public String deleteFunction(@PathVariable("id") int f_id) {
        return functionService.deleteFunction(f_id);
    }
}
