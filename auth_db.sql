-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3308
-- Χρόνος δημιουργίας: 08 Ιαν 2024 στις 09:18:53
-- Έκδοση διακομιστή: 5.7.28
-- Έκδοση PHP: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `auth_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `building`
--

DROP TABLE IF EXISTS `building`;
CREATE TABLE IF NOT EXISTS `building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lon` decimal(11,8) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `building`
--

INSERT INTO `building` (`id`, `uuid`, `name`, `lat`, `lon`, `createdAt`, `updatedAt`) VALUES
(1, 'db6bff60-2142-4e2f-96da-207c83c65056', 'xomaterupdate25', '34.43334000', '66.53334000', '2023-12-20 11:07:46', '2023-12-21 09:31:18'),
(2, 'a8ea3a6e-db16-4143-afab-f279a1fef9a3', 'xoma22', '38.06472785', '23.65248102', '2023-12-20 11:11:58', '2023-12-20 11:11:58'),
(3, '529a60a7-89b6-4251-9655-0ab43c8b33a1', 'xoma3', '38.06472785', '23.65248102', '2023-12-20 13:51:56', '2023-12-20 13:51:56'),
(6, '46ba7d80-9f0d-4f4d-87fc-35af9354240d', 'new peiroxi9', '38.06472785', '23.65248102', '2023-12-20 15:39:35', '2023-12-20 15:39:35'),
(7, '2eec2992-0a5d-4c6e-a22e-89dd6fd96108', 'Xomateri XYTA2', '24.44343400', '58.33232500', '2023-12-21 14:33:39', '2023-12-21 14:55:50');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `buildingmetrics`
--

DROP TABLE IF EXISTS `buildingmetrics`;
CREATE TABLE IF NOT EXISTS `buildingmetrics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buildingId` int(11) DEFAULT NULL,
  `metricId` int(11) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BuildingMetrics_metricId_buildingId_unique` (`buildingId`,`metricId`),
  KEY `metricId` (`metricId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `buildingmetrics`
--

INSERT INTO `buildingmetrics` (`id`, `buildingId`, `metricId`, `value`, `year`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 30, 2023, '2023-12-21 00:00:00', '2023-12-21 00:00:00'),
(2, 1, 4, 56, 2023, '2023-12-21 00:00:00', '2023-12-21 00:00:00');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `metric`
--

DROP TABLE IF EXISTS `metric`;
CREATE TABLE IF NOT EXISTS `metric` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `metric`
--

INSERT INTO `metric` (`id`, `uuid`, `name`, `createdAt`, `updatedAt`) VALUES
(2, '88f66f33-4b26-490f-b31c-1abb208b191c', 'PS100', '2023-12-21 09:24:49', '2023-12-21 09:24:49'),
(4, '95cc5867-a1bb-4fef-9cd5-431dbe7f85fc', 'TSP2', '2023-12-21 13:46:26', '2023-12-21 15:24:20');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `product`
--

INSERT INTO `product` (`id`, `uuid`, `name`, `price`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '007e2ed8-c1f8-4f0e-97d0-1a0459227fac', 'product 1', 333, 3, '2023-11-24 15:06:45', '2023-11-24 15:06:45'),
(2, 'fb694dc2-f71d-420e-809c-f1baa8957eee', 'product 2', 533, 3, '2023-11-24 15:07:08', '2023-11-24 15:07:08'),
(3, 'da64c899-b097-4df5-8e8a-3586ba2629b7', 'product 3', 553, 3, '2023-11-24 15:07:17', '2023-11-24 15:07:17'),
(5, '7adc6b0a-7159-4556-8d95-76f28625d2cd', 'product 5', 6653, 1, '2023-11-24 15:09:04', '2023-11-24 15:09:04'),
(6, '7cad4221-3e0a-4085-9635-fcd242ae5329', 'product 6', 7653, 1, '2023-11-24 15:09:16', '2023-11-24 15:09:16'),
(9, 'bbe54a26-f8c8-4d58-ba12-7e149dcf8bf7', 'product 6', 7653, 3, '2023-11-27 10:16:48', '2023-11-27 10:16:48'),
(12, 'a13e1f59-b690-4d29-aa44-f181216cc187', 'product antouan', 1234, 6, '2023-12-05 09:42:06', '2023-12-05 09:42:06'),
(13, '67a3206a-39d4-4b91-a6e9-461cb62179a8', 'product 90', 8953, 1, '2023-12-20 10:28:02', '2023-12-20 10:28:02');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '37ca1953-2a98-4623-8a51-99729ca432da', 'Ilias zabetakis', 'elias3@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Yir/QjfhFX2vHsgxtBCVuQ$Ij4maIFjizsfTbluZFYCNFp/kcO+0babG9dK4L9g1b0', 'admin', '2023-11-24 11:29:33', '2023-12-05 09:08:17'),
(3, '9cfa3afb-cbf8-43be-bf98-4d7d0d6c816f', 'john doe', 'john@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$EGg+NB/JqAZUuO5j8YiNqA$0nTd8XzipfFSC+ZbMnosMdjqq918rQusKxcP3hny8m4', 'user', '2023-11-24 13:41:37', '2023-11-24 13:41:37'),
(4, 'c4b7dd83-c599-4c57-bdc0-73c581aca4e2', 'john doec  ddd', 'john3@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$B1UIycCyvHb1Jp2htJmIaA$QkqOyCUaM+Cyt/+cHtqIISYD0BIo/AdzA9z/sfgccF8', 'user', '2023-11-24 14:37:42', '2023-11-24 14:37:42'),
(6, '135415aa-1c09-457f-969a-49954f6d37b2', 'antonis', 'apalios@cmtprooptiki.gr', '$argon2id$v=19$m=65536,t=3,p=4$GdPbpM6pznyIadqjnGzK+Q$ymvH+yPKPUXukBfpXpROdEjgVgsT6uZpoQabPdhc+0o', 'admin', '2023-12-05 09:38:58', '2023-12-05 09:39:59');

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `buildingmetrics`
--
ALTER TABLE `buildingmetrics`
  ADD CONSTRAINT `buildingmetrics_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `building` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buildingmetrics_ibfk_2` FOREIGN KEY (`metricId`) REFERENCES `metric` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
