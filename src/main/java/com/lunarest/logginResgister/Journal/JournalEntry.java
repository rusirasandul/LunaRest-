package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.appuser.AppUser;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class JournalEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String entryText;

    private String mood;

    public JournalEntry() {}

    public JournalEntry(AppUser user, LocalDate date, String entryText, String mood) {
        this.user = user;
        this.date = date;
        this.entryText = entryText;
        this.mood = mood;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getEntryText() { return entryText; }
    public void setEntryText(String entryText) { this.entryText = entryText; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
}