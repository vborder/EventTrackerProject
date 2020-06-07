package com.skilldistillery.events.services;

import java.util.List;

import com.skilldistillery.events.entities.Sleep;

public interface SleepService {
	List<Sleep> findAllSleep();
	Sleep findSleepById(int sleepId);
	Sleep create(Sleep sleep);
	Sleep update(int sleepId, Sleep sleep);
	boolean deleteById(int sleepId);

}
