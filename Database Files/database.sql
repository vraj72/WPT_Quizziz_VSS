CREATE TABLE `Teacher` (
  `Teacher_ID` int PRIMARY KEY,
  `Email` char(50) UNIQUE NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `Mobile_number` varchar(12) NOT NULL,
  `A1` int,
  `A2` int,
  `A3` int,
  `A4` varchar(20),
  `A5` varchar(20),
  `A6` varchar(20),
  `A7` char(20),
  `A8` char(20),
  `A9` float,
  `A10` datetime
);

CREATE TABLE `Student` (
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Student_ID` int PRIMARY KEY,
  `Email` char(50) UNIQUE NOT NULL,
  `Gender` char(10) NOT NULL,
  `Mobile_no` varchar(15) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `A1` int,
  `A2` int,
  `A3` varchar(20),
  `A4` varchar(20),
  `A5` char(20),
  `A6` char(20),
  `A7` datetime
);

CREATE TABLE `course` (
  `Course_ID` int PRIMARY KEY,
  `Course_name` varchar(50) NOT NULL,
  `Desc` varchar(1000),
  `Teacher_ID` char(50) NOT NULL,
  `A1` int,
  `A2` int,
  `A3` int,
  `A4` varchar(20),
  `A5` varchar(20),
  `A6` varchar(20),
  `A7` datetime
);

CREATE TABLE `Enrollement` (
  `Eid` int PRIMARY KEY,
  `Course_ID` int NOT NULL,
  `Student_ID` int NOT NULL,
  `status` int NOT NULL,
  `A1` int,
  `A2` int,
  `A3` int,
  `A4` varchar(20),
  `A5` varchar(20),
  `A6` varchar(20),
  `A7` datetime
);

CREATE TABLE `Quizz` (
  `Quizz_ID` int PRIMARY KEY,
  `Course_ID` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `desc` varchar(1000),
  `starttime` datetime,
  `endtime` datetime,
  `passing` float,
  `total_marks` float,
  `avg` float,
  `attempts` int,
  `questions_mongo_ID` varchar(100),
  `A1` int,
  `A2` int,
  `A3` int,
  `A4` varchar(20),
  `A5` varchar(20),
  `A6` varchar(20),
  `A7` datetime
);

CREATE TABLE `QuizzAttempt` (
  `AID` int PRIMARY KEY,
  `Quizz_ID` int NOT NULL,
  `Student_ID` int NOT NULL,
  `marks` float,
  `status` int,
  `attempt_mongo_ID` varchar(100),
  `A1` int,
  `A2` int,
  `A3` int,
  `A4` varchar(20),
  `A5` varchar(20),
  `A6` varchar(20),
  `A7` datetime
);

CREATE UNIQUE INDEX `Enrollement_index_0` ON `Enrollement` (`Student_ID`, `Course_ID`);

ALTER TABLE `course` ADD FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`Teacher_ID`);

ALTER TABLE `Enrollement` ADD FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

ALTER TABLE `Enrollement` ADD FOREIGN KEY (`Student_ID`) REFERENCES `Student` (`Student_ID`);

ALTER TABLE `Quizz` ADD FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

ALTER TABLE `QuizzAttempt` ADD FOREIGN KEY (`Quizz_ID`) REFERENCES `Quizz` (`Quizz_ID`);

ALTER TABLE `QuizzAttempt` ADD FOREIGN KEY (`Student_ID`) REFERENCES `Student` (`Student_ID`);
