package com.example.webservice.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Answer {
    private int id;
    private String description;
    private boolean correctValue;
    private String correctAnswertext;

    @JsonCreator
    public Answer(@JsonProperty("id") int id, @JsonProperty("description") String description,
                  @JsonProperty("correctValue") boolean correctValue,
                  @JsonProperty("correctAnswertext") String correctAnswertext) {
        this.id = id;
        this.description = description;
        this.correctValue = correctValue;
        this.correctAnswertext = correctAnswertext;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCorrectValue() {
        return correctValue;
    }

    public void setCorrectValue(boolean correctValue) {
        this.correctValue = correctValue;
    }

    public String getCorrectAnswertext() {
        return correctAnswertext;
    }

    public void setCorrectAnswertext(String correctAnswertext) {
        this.correctAnswertext = correctAnswertext;
    }
}
