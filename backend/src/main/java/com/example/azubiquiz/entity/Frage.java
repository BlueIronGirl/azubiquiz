package com.example.azubiquiz.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "frage")
public class Frage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;

    @NotBlank
    private String name;

    @NotBlank
    private String beschreibung;

    private String hinweis;

    private int antwortTyp; // TODO (ALB) 01.09.2023: enum

    @OneToMany(mappedBy = "frage", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Antwort> antworten;

    @ManyToOne
    @JoinColumn(name = "test_id")
    @JsonIgnore
    private Test test;

}