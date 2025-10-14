package com.klef.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "function_table")
public class Function {

    @Id
    private int f_id;

    @Column(nullable = false, length = 100)
    private String funcname;

    @Column(nullable = false, length = 100)
    private String funccap;

    @Column(nullable = false, length = 100)
    private String contactno;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String candname;

   
    public int getF_id() {
        return f_id;
    }

    public void setF_id(int f_id) {
        this.f_id = f_id;
    }

    public String getFuncname() {
        return funcname;
    }

    public void setFuncname(String funcname) {
        this.funcname = funcname;
    }

    public String getFunccap() {
        return funccap;
    }

    public void setFunccap(String funccap) {
        this.funccap = funccap;
    }

    public String getContactno() {
        return contactno;
    }

    public void setContactno(String contactno) {
        this.contactno = contactno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCandname() {
        return candname;
    }

    public void setCandname(String candname) {
        this.candname = candname;
    }
}
