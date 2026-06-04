-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: futa_calculator
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school` varchar(100) NOT NULL,
  `min_jamb` int NOT NULL,
  `range_low` decimal(5,2) NOT NULL,
  `range_high` decimal(5,2) NOT NULL,
  `is_estimated` tinyint(1) DEFAULT '0',
  `is_health` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (121,'Computer Science','SOC',180,69.00,76.00,0,0),(122,'Software Engineering','SOC',180,63.75,71.00,0,0),(123,'Cyber Security','SOC',180,63.75,71.00,0,0),(124,'Information Technology','SOC',180,63.75,71.00,0,0),(125,'Information Systems','SOC',180,63.75,71.00,0,0),(126,'Electrical & Electronics Engineering','SESE',180,74.37,82.00,0,0),(127,'Computer Engineering','SESE',180,69.62,76.00,0,0),(128,'Information & Communication Engineering','SESE',180,49.75,57.00,0,0),(129,'Biomedical Engineering','SESE',180,60.00,68.00,0,0),(130,'Mechanical Engineering','SIMME',180,73.75,80.00,0,0),(131,'Civil Engineering','SIMME',180,71.87,78.00,0,0),(132,'Agricultural Engineering','SIMME',180,55.12,62.00,0,0),(133,'Metallurgical & Materials Engineering','SIMME',180,54.87,61.00,0,0),(134,'Mining Engineering','SIMME',180,54.75,60.00,0,0),(135,'Industrial & Production Engineering','SIMME',180,47.50,55.00,0,0),(136,'Chemical Engineering','SIMME',180,65.00,72.00,0,0),(137,'Medicine and Surgery (MBBS)','SBMS',220,78.50,86.00,1,1),(138,'Nursing Science','SBMS',200,72.00,78.00,1,1),(139,'Human Anatomy','SBMS',180,59.50,66.00,0,1),(140,'Physiology','SBMS',180,57.25,64.00,0,1),(141,'Medical Laboratory Science','SBMS',180,68.00,75.00,0,1),(142,'Public Health','SBMS',180,62.00,69.00,0,1),(143,'Medical Biochemistry','SBMS',180,60.00,68.00,0,1),(144,'Biomedical Technology','SBMS',180,47.50,55.00,0,1),(145,'Architecture','SET',180,72.87,80.00,0,0),(146,'Surveying and Geoinformatics','SET',180,64.25,71.00,0,0),(147,'Quantity Surveying','SET',180,57.00,64.00,0,0),(148,'Building','SET',180,56.62,63.00,0,0),(149,'Industrial Design','SET',180,53.25,60.00,0,0),(150,'Urban & Regional Planning','SET',180,52.87,59.00,0,0),(151,'Estate Management','SET',180,47.50,54.00,0,0),(152,'Biochemistry','SLS',180,63.37,69.00,0,0),(153,'Microbiology','SLS',180,63.00,69.00,0,0),(154,'Biology','SLS',180,47.50,55.00,0,0),(155,'Biotechnology','SLS',180,47.50,55.00,0,0),(156,'Mathematics','SPS',180,59.00,66.00,0,0),(157,'Physics','SPS',180,47.50,55.00,0,0),(158,'Chemistry','SPS',180,47.50,55.00,0,0),(159,'Statistics','SPS',180,47.50,55.00,0,0),(160,'Industrial Mathematics','SPS',180,55.00,62.00,0,0),(161,'Industrial Chemistry','SPS',180,55.00,62.00,0,0),(162,'Applied Geophysics','SEMS',180,47.50,55.00,0,0),(163,'Applied Geology','SEMS',180,47.50,55.00,0,0),(164,'Meteorology','SEMS',180,47.50,55.00,0,0),(165,'Marine Science & Technology','SEMS',180,47.50,55.00,0,0),(166,'Remote Sensing & Geosciences Info System','SEMS',180,47.50,55.00,0,0),(167,'Animal Production & Health Services','SAAT',180,55.37,62.00,0,0),(168,'Agric Extension & Communication Technology','SAAT',180,47.50,55.00,0,0),(169,'Agriculture Resource Economics','SAAT',180,47.50,55.00,0,0),(170,'Crop Soil & Pest Management','SAAT',180,47.50,55.00,0,0),(171,'Ecotourism & Wildlife Management','SAAT',180,47.50,55.00,0,0),(172,'Fisheries & Aquaculture','SAAT',180,47.50,55.00,0,0),(173,'Food Science & Technology','SAAT',180,58.00,65.00,0,0),(174,'Forestry & Wood Technology','SAAT',180,47.50,55.00,0,0),(175,'Business Information Technology','SLIT',180,55.00,62.00,0,0),(176,'Project Management Technology','SLIT',180,53.00,60.00,0,0),(177,'Logistics and Transport Technology','SLIT',180,50.00,58.00,0,0),(178,'Entrepreneurship Management Tech.','SLIT',180,47.50,55.00,0,0),(179,'Securities & Investment Management','SLIT',180,47.50,55.00,0,0),(180,'Accounting Technology','SLIT',180,62.00,69.00,0,0);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirements`
--

DROP TABLE IF EXISTS `requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requirements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `jamb_subjects` text NOT NULL,
  `olevel_subjects` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `requirements_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirements`
--

LOCK TABLES `requirements` WRITE;
/*!40000 ALTER TABLE `requirements` DISABLE KEYS */;
INSERT INTO `requirements` VALUES (121,121,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(122,122,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(123,123,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(124,124,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(125,125,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(126,126,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology/Agric'),(127,127,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(128,128,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(129,129,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(130,130,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(131,131,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(132,132,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(133,133,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(134,134,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(135,135,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(136,136,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(137,137,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry (One Sitting)'),(138,138,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(139,139,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(140,140,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(141,141,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(142,142,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(143,143,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(144,144,'English, Biology, Physics, Chemistry','5 Credits: English, Math, Biology, Physics, Chemistry'),(145,145,'English, Math, Physics, Chemistry/Geo/Art','5 Credits: English, Math, Physics, and two of Chemistry, Geo, Art'),(146,146,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Geo'),(147,147,'English, Math, Physics, Chemistry/Geo/Econs','5 Credits: English, Math, Physics, Chemistry/Geo'),(148,148,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry/Geo'),(149,149,'English, Math, Chem/Phys/Art','5 Credits: English, Math, Art/Chem/Phys/Bio'),(150,150,'English, Math, Geo/Econs, One Science Subj','5 Credits: English, Math, Geo/Econs'),(151,151,'English, Math, Economics, One Science Subj','5 Credits: English, Math, Economics, Science Subj'),(152,152,'English, Biology, Chemistry, Physics/Math','5 Credits: English, Math, Biology, Chemistry, Physics'),(153,153,'English, Biology, Chemistry, Physics/Math','5 Credits: English, Math, Biology, Chemistry, Physics'),(154,154,'English, Biology, Chemistry, Physics','5 Credits: English, Math, Biology, Chemistry, Physics'),(155,155,'English, Biology, Chemistry, Physics/Math','5 Credits: English, Math, Biology, Chemistry, Physics'),(156,156,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(157,157,'English, Physics, Math, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(158,158,'English, Chemistry, Math, Physics','5 Credits: English, Math, Chemistry, Physics, Biology'),(159,159,'English, Math, Physics, Chemistry/Econs','5 Credits: English, Math, Physics, Chemistry, Bio/Econs'),(160,160,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(161,161,'English, Chemistry, Math, Physics','5 Credits: English, Math, Chemistry, Physics, Biology'),(162,162,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(163,163,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(164,164,'English, Math, Physics, Geography','5 Credits: English, Math, Physics, Chemistry, Geography'),(165,165,'English, Math, Physics, Chemistry','5 Credits: English, Math, Physics, Chemistry, Biology'),(166,166,'English, Math, Physics, Geography','5 Credits: English, Math, Physics, Chemistry, Geography'),(167,167,'English, Chemistry, Math/Physics, Agric/Bio','5 Credits: English, Math, Chemistry, Physics, Biology'),(168,168,'English, Math, Physics, Chemistry','5 Credits: English, Math, Chemistry, Physics, Biology'),(169,169,'English, Economics, Math, Agric/Bio/Chem','5 Credits: English, Math, Economics, Chem, Bio/Agric'),(170,170,'English, Math, Chemistry, Biology','5 Credits: English, Math, Chemistry, Physics, Biology'),(171,171,'English, Math, Biology, Chemistry','5 Credits: English, Math, Chemistry, Physics, Biology'),(172,172,'English, Math, Biology, Chemistry','5 Credits: English, Math, Chemistry, Physics, Biology'),(173,173,'English, Math, Physics, Chemistry','5 Credits: English, Math, Chemistry, Physics, Biology'),(174,174,'English, Math, Biology, Chemistry','5 Credits: English, Math, Chemistry, Physics, Biology'),(175,175,'English, Math, Economics, Geography/Physics','5 Credits: English, Math, Economics, Physics, Chemistry/Bio'),(176,176,'English, Math, Economics, Physics/Chemistry','5 Credits: English, Math, Economics, Physics, Chemistry'),(177,177,'English, Math, Economics, Physics/Chemistry','5 Credits: English, Math, Economics, Physics, Chemistry'),(178,178,'English, Math, Economics, Physics/Chemistry','5 Credits: English, Math, Economics, Physics, Chemistry'),(179,179,'English, Math, Economics, Physics/Chemistry','5 Credits: English, Math, Economics, Physics, Chemistry'),(180,180,'English, Math, Economics, Accounting/Comm','5 Credits: English, Math, Economics, Accounting, Physics/Chemistry');
/*!40000 ALTER TABLE `requirements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-04  8:30:52
