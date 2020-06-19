package com.skilldistillery.events.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.events.entities.Sleep;
import com.skilldistillery.events.repositories.SleepRepository;

@Service
public class SleepServiceImpl implements SleepService {
	
	@Autowired
	private SleepRepository repo;

	@Override
	public List<Sleep> findAllSleep() {
		return repo.findAll();
	}
	

	@Override
	public Sleep findSleepById(int sleepId) {
		return repo.findSleepById(sleepId);
	}

	@Override
	public Sleep create(Sleep sleep) {
		repo.saveAndFlush(sleep);
		return sleep;
	}

	@Override
	public Sleep update(int sleepId, Sleep sleep) {
		Optional<Sleep> sleepOpt = repo.findById(sleepId);
		
		Sleep updatedSleep = null;
		
		if (sleepOpt.isPresent()) {
			updatedSleep = sleepOpt.get();
			updatedSleep.setSleepLocationTemp(sleep.getSleepLocationTemp());
			updatedSleep.setStartSleepTime(sleep.getStartSleepTime());
			updatedSleep.setEndSleepTime(sleep.getEndSleepTime());
			updatedSleep.setWakingRestfulness(sleep.getWakingRestfulness());
			repo.saveAndFlush(updatedSleep);
			
		}
		
		return updatedSleep;
	}

	@Override
	public boolean deleteById(int sleepId) {
		boolean deleted = false;
		try {
			repo.deleteById(sleepId);
			deleted = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return deleted;
		
	}
	
}
