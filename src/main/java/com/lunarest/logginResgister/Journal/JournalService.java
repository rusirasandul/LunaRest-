package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class JournalService {
    private final JournalRepository journalRepository;

    @Autowired
    public JournalService(JournalRepository journalRepository) {
        this.journalRepository = journalRepository;
    }

    public JournalEntry addJournalEntry(AppUser user, String text, String mood, LocalDate date) {
        JournalEntry entry = new JournalEntry(user, date, text, mood);
        return journalRepository.save(entry);
    }

    public List<JournalEntry> getJournalEntriesByUser(AppUser user) {
        return journalRepository.findByUser(user);
    }

    public void deleteJournalEntry(Long id) {
        journalRepository.deleteById(id);
    }
}