package com.skilldistillery.events.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SleepTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Sleep sleep;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("SleepTrackerPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		sleep = em.find(Sleep.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		sleep = null;
	}

	@Test
	@DisplayName("initial mapping test")
	void test1() {
		assertNotNull(sleep);
		assertEquals("test", sleep.getName());
	}

}
