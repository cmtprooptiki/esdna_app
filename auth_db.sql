-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3308
-- Χρόνος δημιουργίας: 15 Ιαν 2024 στις 09:31:16
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
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lon` decimal(11,8) NOT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `building`
--

INSERT INTO `building` (`id`, `uuid`, `name`, `lat`, `lon`, `category`, `createdAt`, `updatedAt`) VALUES
(1, 'db6bff60-2142-4e2f-96da-207c83c65056', 'Entrance XYTA', '38.06896800', '23.65545900', 'OEDA Dytikis Attikis', '2023-12-20 11:07:46', '2024-01-12 13:00:17'),
(2, 'a8ea3a6e-db16-4143-afab-f279a1fef9a3', 'EMAK Offices', '38.07269050', '23.65735850', 'OEDA Dytikis Attikis', '2023-12-20 11:11:58', '2024-01-12 13:02:30'),
(3, '529a60a7-89b6-4251-9655-0ab43c8b33a1', 'EMAK Dialogi', '38.06472785', '23.65248102', 'OEDA Dytikis Attikis', '2023-12-20 13:51:56', '2024-01-11 13:06:19'),
(4, '46ba7d80-9f0d-4f4d-87fc-35af9354240d', 'Presa', '38.06472785', '23.65248102', 'Stathmos Metafortosis Aporimaton SMA Sxistou', '2023-12-20 15:39:35', '2024-01-11 13:06:48'),
(5, '2eec2992-0a5d-4c6e-a22e-89dd6fd96108', 'Mixanourgio', '24.44343400', '58.33232500', 'Stathmos Metafortosis Aporimaton SMA Sxisto', '2023-12-21 14:33:39', '2024-01-11 13:06:56'),
(6, 'a9e8944c-d074-4c6e-9f85-a925b6a456be', 'Plyntirio', '0.54334556', '0.34334556', 'Stathmos Metafortosis Aporimaton SMA Sxistou', '2024-01-10 11:24:55', '2024-01-11 13:07:05'),
(7, 'aa9b4b47-f82b-4b4a-aa4b-4ca6a2782841', 'Klimakostasio palaiou ktiriou', '38.06854550', '23.64637230', 'Kentrikes Ypiresies', '2024-01-10 11:25:29', '2024-01-12 13:03:18'),
(8, 'df97fd67-c9e5-49f7-8584-471c97bdf2d5', 'Klimakostasio Neou Ktiriou', '38.06854550', '23.64637230', 'Kentrikes Ypiresies', '2024-01-10 11:26:17', '2024-01-12 13:03:53');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `buildingmetrics`
--

DROP TABLE IF EXISTS `buildingmetrics`;
CREATE TABLE IF NOT EXISTS `buildingmetrics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `buildingId` int(11) DEFAULT NULL,
  `metricId` int(11) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buildingId` (`buildingId`),
  KEY `metricId` (`metricId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `buildingmetrics`
--

INSERT INTO `buildingmetrics` (`id`, `uuid`, `buildingId`, `metricId`, `value`, `year`, `createdAt`, `updatedAt`) VALUES
(1, '42bf2a1d-1c19-486d-9cb1-a0c9357fa066', 1, 2, 54, 2023, '2024-01-12 09:32:57', '2024-01-12 09:32:57'),
(2, '972050dc-0736-4eaa-91b9-9547ee097077', 1, 2, 56, 2023, '2024-01-12 09:33:05', '2024-01-12 09:33:05'),
(3, '6784a7c0-6a33-4ea0-94d8-26e7376a6968', 1, 2, 58, 2023, '2024-01-12 09:33:18', '2024-01-12 09:33:18'),
(4, 'ab137621-e806-4826-aa76-091b003ebfe9', 2, 4, 25, 2023, '2024-01-12 10:36:29', '2024-01-12 10:36:29'),
(5, 'f246645f-8de6-4dce-9f81-702d1669aa5c', 2, 5, 45, 2023, '2024-01-12 10:36:43', '2024-01-12 10:36:43'),
(6, '0e97ab69-cff7-489a-94d8-995fe2acc02a', 2, 4, 85, 2023, '2024-01-12 10:37:04', '2024-01-12 10:37:04'),
(7, '9cd5d639-79ea-4aa4-a6db-258f76fc500f', 1, 2, 45, 2024, '2024-01-12 10:37:19', '2024-01-12 10:37:19');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `metric`
--

DROP TABLE IF EXISTS `metric`;
CREATE TABLE IF NOT EXISTS `metric` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `metric`
--

INSERT INTO `metric` (`id`, `uuid`, `name`, `createdAt`, `updatedAt`) VALUES
(2, '88f66f33-4b26-490f-b31c-1abb208b191c', 'PM10', '2023-12-21 09:24:49', '2024-01-10 11:29:10'),
(4, '95cc5867-a1bb-4fef-9cd5-431dbe7f85fc', 'TSP', '2023-12-21 13:46:26', '2024-01-10 11:28:58'),
(5, '456b52ac-7dab-474a-906e-d3282b0240fc', 'TEQ PCDD/Fs', '2024-01-10 11:28:12', '2024-01-10 11:28:12'),
(6, '3a5209de-b8a8-4e71-84ea-68ed2349a67a', 'TEQ PCBS', '2024-01-10 11:28:22', '2024-01-10 11:28:22'),
(7, '3adc381c-bec5-4b6b-9021-5e5b887db377', 'ind PCBs', '2024-01-10 11:28:49', '2024-01-10 11:28:49'),
(8, 'd1ace8f4-8455-4ef1-abfd-79023d9fcfa3', 'PM2.5', '2024-01-10 11:29:18', '2024-01-10 11:29:18'),
(9, '1c5f9c02-7b24-4aeb-b376-0917c20a94a7', 'SO2', '2024-01-10 11:29:28', '2024-01-10 11:29:28'),
(10, '8cea1dbd-da3e-4af7-8e4b-9304f0e3d1ce', 'CO_', '2024-01-10 11:29:45', '2024-01-10 11:29:45'),
(11, '548c2c2c-401d-4367-a7a5-dd8a2a9d116d', 'NO2', '2024-01-10 11:29:56', '2024-01-10 11:29:56'),
(12, '8ccfb92c-0c28-4d27-80a2-b40e887068c5', 'NO_', '2024-01-10 11:30:04', '2024-01-10 11:30:04'),
(13, '0ed3ffb1-f0e9-4d97-bbf6-aae6cd913873', 'As_', '2024-01-10 11:30:15', '2024-01-10 11:30:15');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `sid` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` mediumtext COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('1E33w2m-WLFXfXzrqeUj-j90IWHCQSlQ', '2024-01-16 08:53:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-15 08:53:15', '2024-01-15 08:53:15'),
('hAZbPLNveFp4OT6lkxRoTzLH47muWUnT', '2024-01-16 09:13:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"37ca1953-2a98-4623-8a51-99729ca432da\"}', '2024-01-15 08:53:15', '2024-01-15 09:13:48'),
('nOnIljgL1cH6-GI6V0Ejxq6GCIl7OTWu', '2024-01-16 09:13:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-15 09:13:38', '2024-01-15 09:13:38'),
('u_eXwwqIiYLAgMEMWuRACD2OLQQjDv_s', '2024-01-16 09:07:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-15 09:07:53', '2024-01-15 09:07:53'),
('vo-5e-CQpABPyRwMsC12ngwCeSuQ0tDR', '2024-01-16 09:13:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-15 09:13:48', '2024-01-15 09:13:48');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
