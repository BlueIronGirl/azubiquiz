package com.example.azubiquiz.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "test")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;

    @Positive
    @Min(1)
    @Column(nullable = false)
    private int version;

    @NotBlank
    private String name;

    @NotBlank
    private String beschreibung;

    @OneToMany(mappedBy = "test", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Frage> fragen;

}