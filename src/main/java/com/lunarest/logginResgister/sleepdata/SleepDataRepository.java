package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SleepDataRepository extends JpaRepository<SleepData, Long> {

    Optional<SleepData> findByUserAndDate(AppUser user, LocalDate date);

    // Find all sleep data for a specific user
    List<SleepData> findByUser(AppUser user);

    // Find sleep data for a user within a specific date range
    List<SleepData> findByUserAndDateBetween(AppUser user, LocalDate startDate, LocalDate endDate);

    // Find the most recent sleep data entry for a user
    List<SleepData> findTopByUserOrderByDateDesc(AppUser user);

    // Find sleep data by user and sleep quality
    List<SleepData> findByUserAndSleepQuality(AppUser user, int sleepQuality);

    // Find sleep data for a user with weekdays screen time greater than a threshold
    List<SleepData> findByUserAndWeekdaysScreenTimeGreaterThan(AppUser user, double threshold);

    // Custom query to fetch sleep data by user, sorted by date in descending order
    @Query("SELECT s FROM SleepData s WHERE s.user = :user ORDER BY s.date DESC")
    List<SleepData> findRecentSleepData(@Param("user") AppUser user);
}

