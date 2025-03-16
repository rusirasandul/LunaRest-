package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.Journal.JournalEntry;
import com.lunarest.logginResgister.Journal.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    // Get all journal entries
    @GetMapping
    public List<JournalEntry> getAllEntries() {
        return journalService.getAllEntries();
    }

    // Get a single journal entry by ID
    @GetMapping("/{id}")
    public JournalEntry getEntryById(@PathVariable Long id) {
        return journalService.getEntryById(id);
    }

    // Create or update a journal entry
    @PostMapping
    public JournalEntry createOrUpdateEntry(@RequestBody JournalEntry entry) {
        return journalService.saveEntry(entry);
    }

    // Delete a journal entry by ID
    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        journalService.deleteEntry(id);
    }
}
