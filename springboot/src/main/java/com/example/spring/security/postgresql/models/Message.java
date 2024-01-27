package com.example.spring.security.postgresql.models;

public class Message {
    private String infoMessage;

    public Message(String infoMessage) {
        this.infoMessage = infoMessage;
    }

    public String getInfoMessage() {
        return infoMessage;
    }

    public void setInfoMessage(String infoMessage) {
        this.infoMessage = infoMessage;
    }


}
