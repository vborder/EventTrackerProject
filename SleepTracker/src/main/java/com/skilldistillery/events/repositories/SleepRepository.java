package com.skilldistillery.events.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.events.entities.Sleep;

public interface SleepRepository extends JpaRepository<Sleep, Integer> {
	
	Sleep findSleepById(int sleepId);
//	List<Sleep> findEnabledSleep();

}
