package com.skilldistillery.events.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.events.entities.Sleep;
import com.skilldistillery.events.services.SleepService;

@RestController
@CrossOrigin({"*", "http://localhost:4208"})
@RequestMapping("api")
public class SleepController {

	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

	@Autowired
	private SleepService sleepSvc;

	@GetMapping("sleeplist")
	public List<Sleep> index() {
		return sleepSvc.findAllSleep();
	}

	@GetMapping("sleeplist/{sleepId}")
	public Sleep findById(@PathVariable Integer sleepId) {
		return sleepSvc.findSleepById(sleepId);
	}

	@PostMapping("sleeplist")
	public Sleep create(@RequestBody Sleep sleep, HttpServletResponse response, HttpServletRequest request) {
		
		try {
			sleep = sleepSvc.create(sleep);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(sleep.getId());
			response.setHeader("location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(404);
			sleep = null;
		}

		return sleep;
	}

	@PutMapping("sleeplist/{sleepId}")
	public Sleep update(@PathVariable int sleepId, @RequestBody Sleep sleep, HttpServletResponse response) {
		try {
			sleep = sleepSvc.update(sleepId, sleep);
			if (sleep == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			sleep = null;
		}

		return sleep;
	}

	@DeleteMapping("sleeplist/{sleepId}")
	public void deleteById(@PathVariable int sleepId, HttpServletResponse response) {

		if (sleepSvc.deleteById(sleepId)) {
			response.setStatus(204);
		} else {
			response.setStatus(404);
		}
	}
}
