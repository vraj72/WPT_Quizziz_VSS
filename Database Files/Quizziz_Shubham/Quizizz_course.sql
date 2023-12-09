CREATE DATABASE  IF NOT EXISTS `Quizizz` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Quizizz`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: Quizizz
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `Course_ID` int NOT NULL AUTO_INCREMENT,
  `Course_name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `Teacher_ID` int NOT NULL,
  `A1` int DEFAULT NULL,
  `A2` int DEFAULT NULL,
  `A3` int DEFAULT NULL,
  `A4` varchar(20) DEFAULT NULL,
  `A5` varchar(20) DEFAULT NULL,
  `A6` varchar(20) DEFAULT NULL,
  `A7` datetime DEFAULT NULL,
  PRIMARY KEY (`Course_ID`),
  KEY `Teacher_ID` (`Teacher_ID`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`Teacher_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (3001,'History','Learn History or improve your skills online today. Choose from a wide range of History courses offered from top universities and industry leaders.',1001,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3002,'History','Learn History or improve your skills online today. Choose from a wide range of History courses offered from top universities and industry leaders.',1003,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3003,'Science','Science is a universal subject that spans the branch of knowledge that examines the structure and behavior of the physical and natural world through observation and experiment. Science education is most commonly broken down into the following three fields: Biology, chemistry, and physics.',1001,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3004,'Enginerring','BE/BTech is a 4-year undergraduate course in various specializations like Computer Science, Electronics, Mechanical Engineering, Civil Engineering, etc. A diploma in Engineering is a 3-year course students pursue after class 10/12.',1002,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3005,'CDAC','PG-DAC is the most popular PG Diploma course of C-DAC. The course is targeted towards Engineering Graduates and MCA/MSc who wish to venture into the domain of advanced computing.',1005,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 15:24:55
