package com.example.webservice.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Test {
    private int id;
    private int version;
    private int lehrjahr;
    private String name;
    private String description;
    private Question[] questions;

    @JsonCreator
    public Test(@JsonProperty("id") int id, @JsonProperty("version") int version, @JsonProperty("lehrjahr") int lehrjahr,
                @JsonProperty("name") String name, @JsonProperty("description") String description,
                @JsonProperty("questions") Question[] questions) {
        this.id = id;
        this.version = version;
        this.lehrjahr = lehrjahr;
        this.name = name;
        this.description = description;
        this.questions = questions;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public int getLehrjahr() {
        return lehrjahr;
    }

    public void setLehrjahr(int lehrjahr) {
        this.lehrjahr = lehrjahr;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Question[] getQuestions() {
        return questions;
    }

    public void setQuestions(Question[] questions) {
        this.questions = questions;
    }
}
