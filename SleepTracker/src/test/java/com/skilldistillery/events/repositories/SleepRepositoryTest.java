package com.skilldistillery.events.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.events.entities.Sleep;

@SpringBootTest
public class SleepRepositoryTest {
	
	@Autowired
	private SleepRepository repo;
	
	@Test
	@DisplayName("sleep repo test")
	public void test1() {
		Optional<Sleep> sleepOpt = repo.findById(1);
		assertTrue(sleepOpt.isPresent());
		Sleep sleep = sleepOpt.get();
//		assertEquals(LocalDate.parse("2020-06-03"), sleep.getStartSleepTime());
//		assertEquals(true, sleep.isEnabled());
	}

}
