package com.lunarest.logginResgister.Journal;



import com.lunarest.logginResgister.Journal.JournalEntry;
import com.lunarest.logginResgister.Journal.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalRepository journalRepository;

    // Get all journal entries
    public List<JournalEntry> getAllEntries() {
        return journalRepository.findAll();
    }

    // Get a single journal entry by ID
    public JournalEntry getEntryById(Long id) {
        return journalRepository.findById(id).orElse(null);
    }

    // Create or update a journal entry
    public JournalEntry saveEntry(JournalEntry entry) {
        return journalRepository.save(entry);
    }

    // Delete a journal entry by ID
    public void deleteEntry(Long id) {
        journalRepository.deleteById(id);
    }
}

