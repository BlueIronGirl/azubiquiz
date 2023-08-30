package com.example.webservice.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Question {
    private int id;
    private String name;
    private String description;
    private String hint;
    private int answerType;
    private Answer[] answers;

    @JsonCreator
    public Question(@JsonProperty("id") int id, @JsonProperty("name") String name,
                    @JsonProperty("description") String description,  @JsonProperty("hint") String hint,
                    @JsonProperty("answerType") int answerType,
                    @JsonProperty("answers") Answer[] answers) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hint = hint;
        this.answers = answers;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public int getAnswerType() {
        return answerType;
    }

    public void setAnswerType(int answerType) {
        this.answerType = answerType;
    }

    public Answer[] getAnswers() {
        return answers;
    }

    public void setAnswers(Answer[] answers) {
        this.answers = answers;
    }
}
