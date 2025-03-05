package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
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

    public JournalEntry(AppUser user, LocalDate date, String entryText) {
        this.user = user;
        this.date = date;
        this.entryText = entryText;
    }
}
