package com.careflow.appointment.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String password;
    private String role;

    public Long getId(){ return id; }
    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public String getPhone(){ return phone; }
    public String getPassword(){ return password; }
    public String getRole(){ return role; }
    public void setId(Long v){ id=v; }
    public void setName(String v){ name=v; }
    public void setEmail(String v){ email=v; }
    public void setPhone(String v){ phone=v; }
    public void setPassword(String v){ password=v; }
    public void setRole(String v){ role=v; }
}
