package com.klef.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.back.model.Function;
import com.klef.back.repository.FunctionRepository;

@Service
public class FunctionServiceImpl implements FunctionService {

    @Autowired
    private FunctionRepository functionRepository;

    @Override
    public String bookFunc(Function function) {
        functionRepository.save(function);
        return "Function booked successfully!";
    }

    @Override
    public List<Function> viewallfunctions() {
        return functionRepository.findAll();
    }

    @Override
    public Function getFunctionById(int f_id) {
        return functionRepository.findById(f_id).orElse(null);
    }

   
    @Override
    public String updateFunction(int id, Function function) {
        Optional<Function> optionalFunction = functionRepository.findById(id);

        if (optionalFunction.isPresent()) {
            Function existing = optionalFunction.get();

            existing.setFuncname(function.getFuncname());
            existing.setFunccap(function.getFunccap());
            existing.setContactno(function.getContactno());
            existing.setEmail(function.getEmail());
            existing.setCandname(function.getCandname());

            functionRepository.save(existing);
            return "Function updated successfully!";
        } else {
            return "Function not found!";
        }
    } 



    @Override
    public String deleteFunction(int f_id) {
        if(functionRepository.existsById(f_id)) {
            functionRepository.deleteById(f_id);
            return "Function deleted successfully!";
        } else {
            return "Function not found!";
        }
    }
}
