package com.lunarest.logginResgister.sleepdata;

import com.lunarest.logginResgister.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SleepDataRepository extends JpaRepository<SleepData, Long> {
    List<SleepData> findByUser(AppUser user);
}
