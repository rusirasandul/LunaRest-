package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface JournalRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByUser(AppUser user);
    List<JournalEntry> findByUserAndDate(AppUser user, LocalDate date);
}