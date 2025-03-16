package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.Journal.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalRepository extends JpaRepository<JournalEntry, Long> {
}
