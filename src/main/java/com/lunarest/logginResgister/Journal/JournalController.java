package com.lunarest.logginResgister.Journal;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/journal")
public class JournalController {
    private final JournalService journalService;

    @Autowired
    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @PostMapping
    public ResponseEntity<?> addJournalEntry(@AuthenticationPrincipal AppUser user,
                                             @RequestBody Map<String, String> request) {
        String text = request.get("text");
        String mood = request.get("mood");
        LocalDate date = LocalDate.now();
        JournalEntry entry = journalService.addJournalEntry(user, text, mood, date);
        return ResponseEntity.ok(entry);
    }

    @GetMapping
    public List<JournalEntry> getJournalEntries(@AuthenticationPrincipal AppUser user) {
        return journalService.getJournalEntriesByUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJournalEntry(@PathVariable Long id) {
        journalService.deleteJournalEntry(id);
        return ResponseEntity.ok("Journal entry deleted successfully");
    }
}