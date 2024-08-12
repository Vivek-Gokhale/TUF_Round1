-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2024 at 06:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flashcard_learning_tool`
--

-- --------------------------------------------------------

--
-- Table structure for table `que_and_ans`
--

CREATE TABLE `que_and_ans` (
  `id` int(10) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `qlike` int(10) NOT NULL,
  `qdislike` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `que_and_ans`
--

INSERT INTO `que_and_ans` (`id`, `question`, `answer`, `qlike`, `qdislike`) VALUES
(3, 'How many leetcode question you have solved and what is your contest rating', 'i have solved across 600+ leetcode question and contest rating exceeded 1600', 13, 2),
(4, 'what is your college name and from which semester are you currently in?\n', 'i am from PDEU college and currently in B.Tech 5th semester', 17, 3),
(10, 'what is yours aim in near future ? ', 'i am targetting to became software engineer at google.', 11, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `que_and_ans`
--
ALTER TABLE `que_and_ans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `que_and_ans`
--
ALTER TABLE `que_and_ans`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
