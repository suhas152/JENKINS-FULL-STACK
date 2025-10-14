package com.klef.back.service;

import java.util.List;

import com.klef.back.model.Function;

public interface FunctionService {
   
    public String bookFunc(Function function);

  
    public List<Function> viewallfunctions();
    public Function getFunctionById(int f_id);

   
    public String updateFunction(int id,Function function);

  
    public String deleteFunction(int f_id);
}
