-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sleeptracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sleeptracker` ;

-- -----------------------------------------------------
-- Schema sleeptracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sleeptracker` DEFAULT CHARACTER SET utf8 ;
USE `sleeptracker` ;

-- -----------------------------------------------------
-- Table `sleep`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sleep` ;

CREATE TABLE IF NOT EXISTS `sleep` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sleep_location_temp` DECIMAL(9,2) NULL,
  `start_sleep_time` DATETIME NOT NULL,
  `end_sleep_time` DATETIME NULL,
  `restfulness_upon_waking` INT NULL,
  `enabled` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS sleeptrackeruser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'sleeptrackeruser'@'localhost' IDENTIFIED BY 'sleeptrackeruser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'sleeptrackeruser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `sleep`
-- -----------------------------------------------------
START TRANSACTION;
USE `sleeptracker`;
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (1, 66.4, '2020-05-24 23:00:00', '2020-05-25 08:32:00', 4, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (2, 72.1, '2020-05-25 23:18:00', '2020-05-26 07:14:00', 3, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (3, 70.3, '2020-05-26 22:13:00', '2020-05-27 09:12:00', 4, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (4, 67.8, '2020-05-27 22:56:00', '2020-05-28 06:20:00', 4, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (5, 66.4, '2020-05-28 23:47:00', '2020-05-29 08:42:00', 5, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (6, 64.2, '2020-05-29 23:02:00', '2020-05-30 07:18:00', 3, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (7, 68.3, '2020-05-31 00:18:00', '2020-05-31 09:40:00', 3, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (8, 68.5, '2020-06-01 22:11:00', '2020-06-02 06:33:00', 2, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (9, 69.2, '2020-06-02 23:08:00', '2020-06-03 08:11:00', 4, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (10, 66.2, '2020-06-03 23:33:00', '2020-06-04 08:22:00', 4, 1);
INSERT INTO `sleep` (`id`, `sleep_location_temp`, `start_sleep_time`, `end_sleep_time`, `restfulness_upon_waking`, `enabled`) VALUES (11, 66.2, '2020-06-04 23:28:00', '2020-06-05 08:53:00', 3, 1);

COMMIT;

