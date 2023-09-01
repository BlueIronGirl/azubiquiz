package com.example.azubiquiz.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "antwort")
public class Antwort {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long id;

    @NotBlank
    private String beschreibung;

    private boolean korrekt;

    private String korrekterAntwortText;

    @ManyToOne
    @JoinColumn(name = "frage_id")
    @JsonIgnore
    private Frage frage;

}