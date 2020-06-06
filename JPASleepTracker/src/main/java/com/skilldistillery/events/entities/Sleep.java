package com.skilldistillery.events.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Sleep {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="sleep_location_temp")
	private Double sleepLocationTemp;
	
	@Column(name="start_sleep_time")
	@CreationTimestamp
	private LocalDateTime startSleepTime;
	
	@Column(name="end_sleep_time")
	private LocalDateTime endSleepTime;
	
	@Column(name="restfulness_upon_waking")
	private Integer wakingRestfulness;
	
	private boolean enabled;

	public Sleep(int id, Double sleepLocationTemp, LocalDateTime startSleepTime, LocalDateTime endSleepTime,
			Integer wakingRestfulness, boolean enabled) {
		super();
		this.id = id;
		this.sleepLocationTemp = sleepLocationTemp;
		this.startSleepTime = startSleepTime;
		this.endSleepTime = endSleepTime;
		this.wakingRestfulness = wakingRestfulness;
		this.enabled = enabled;
	}
	
	public Sleep() {
		super();
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public Double getSleepLocationTemp() {
		return sleepLocationTemp;
	}

	public void setSleepLocationTemp(Double sleepLocationTemp) {
		this.sleepLocationTemp = sleepLocationTemp;
	}

	public LocalDateTime getStartSleepTime() {
		return startSleepTime;
	}

	public void setStartSleepTime(LocalDateTime startSleepTime) {
		this.startSleepTime = startSleepTime;
	}

	public LocalDateTime getEndSleepTime() {
		return endSleepTime;
	}

	public void setEndSleepTime(LocalDateTime endSleepTime) {
		this.endSleepTime = endSleepTime;
	}

	public int getWakingRestfulness() {
		return wakingRestfulness;
	}

	public void setWakingRestfulness(Integer wakingRestfulness) {
		this.wakingRestfulness = wakingRestfulness;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Sleep other = (Sleep) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Sleep [id=" + id + ", sleepLocationTemp=" + sleepLocationTemp + ", startSleepTime=" + startSleepTime
				+ ", endSleepTime=" + endSleepTime + ", wakingRestfulness=" + wakingRestfulness + ", enabled=" + enabled
				+ "]";
	}

}
