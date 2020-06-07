package com.skilldistillery.events.data;

import java.util.List;

import com.skilldistillery.events.entities.Sleep;

public interface SleepDao {
	List<Sleep> findAllSleep(Integer sleepId);
	Sleep create(Sleep sleep);
	Sleep update(int sleepId, Sleep sleep);
	boolean deleteById(int sleepId);
}
