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
-- Table structure for table `Quizz`
--

DROP TABLE IF EXISTS `Quizz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quizz` (
  `Quizz_ID` int NOT NULL AUTO_INCREMENT,
  `Course_ID` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `starttime` datetime DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `passing` float DEFAULT NULL,
  `total_marks` float DEFAULT NULL,
  `avg` float DEFAULT NULL,
  `attempts` int DEFAULT NULL,
  `questions_mongo_ID` varchar(100) DEFAULT NULL,
  `A1` int DEFAULT NULL,
  `A2` int DEFAULT NULL,
  `A3` int DEFAULT NULL,
  `A4` varchar(20) DEFAULT NULL,
  `A5` varchar(20) DEFAULT NULL,
  `A6` varchar(20) DEFAULT NULL,
  `A7` datetime DEFAULT NULL,
  PRIMARY KEY (`Quizz_ID`),
  KEY `Course_ID` (`Course_ID`),
  CONSTRAINT `Quizz_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5013 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quizz`
--

LOCK TABLES `Quizz` WRITE;
/*!40000 ALTER TABLE `Quizz` DISABLE KEYS */;
INSERT INTO `Quizz` VALUES (5001,3001,'History of India','Indian History','2023-12-07 12:00:00','2023-12-20 12:00:00',35,100,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5002,3001,'History of Rome','Italian History','2023-12-08 12:00:00','2023-12-21 12:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5003,3001,'History of England','European History','2023-12-18 12:00:00','2023-12-21 12:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5004,3001,'History of Marathas','Indian History','2023-12-19 12:00:00','2023-12-30 12:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5005,3002,'History of Marathas','Indian History','2023-12-19 12:00:00','2023-12-30 12:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5006,3003,'Physics','Laws Of Motion','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5007,3003,'Chemistry','ElectroChemistry','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5008,3003,'Biology','Biotechnology','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5009,3005,'WPT Mock1','React','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5010,3005,'C++ Mock1','c++ functions','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5011,3005,'DSA Mock1','Algorithems','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5012,3005,'DBT Mock1','Mysql','2023-12-29 12:00:00','2023-12-30 13:00:00',25,50,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Quizz` ENABLE KEYS */;
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
