-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3308
-- Χρόνος δημιουργίας: 18 Ιαν 2024 στις 08:12:54
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
(1, 'db6bff60-2142-4e2f-96da-207c83c65056', 'Είσοδος ΧΥΤΑ', '38.06896800', '23.65545900', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 11:07:46', '2024-01-16 23:47:36'),
(2, 'a8ea3a6e-db16-4143-afab-f279a1fef9a3', 'ΕΜΑΚ Γραφεία', '38.07269050', '23.65735850', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 11:11:58', '2024-01-16 23:47:54'),
(3, '529a60a7-89b6-4251-9655-0ab43c8b33a1', 'ΕΜΑΚ Διαλογή', '38.06472785', '23.65248102', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 13:51:56', '2024-01-16 23:48:21'),
(4, '46ba7d80-9f0d-4f4d-87fc-35af9354240d', 'Πρέσα', '38.06472785', '23.65248102', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2023-12-20 15:39:35', '2024-01-16 23:49:05'),
(5, '2eec2992-0a5d-4c6e-a22e-89dd6fd96108', 'Μηχανουργείο', '24.44343400', '58.33232500', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2023-12-21 14:33:39', '2024-01-16 23:49:22'),
(6, 'a9e8944c-d074-4c6e-9f85-a925b6a456be', 'Πλυντήριο', '0.54334556', '0.34334556', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2024-01-10 11:24:55', '2024-01-16 23:49:37'),
(7, 'aa9b4b47-f82b-4b4a-aa4b-4ca6a2782841', 'Κλιμακοστάσιο παλαιού κτηρίου', '38.06854550', '23.64637230', 'Κεντρικές Υπηρεσίες', '2024-01-10 11:25:29', '2024-01-16 23:50:44'),
(8, 'df97fd67-c9e5-49f7-8584-471c97bdf2d5', 'Κλιμακοστάσιο νέου κτηρίου', '38.06854550', '23.64637230', 'Κεντρικές Υπηρεσίες', '2024-01-10 11:26:17', '2024-01-16 23:51:16');

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
  `year` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buildingId` (`buildingId`),
  KEY `metricId` (`metricId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `buildingmetrics`
--

INSERT INTO `buildingmetrics` (`id`, `uuid`, `buildingId`, `metricId`, `value`, `year`, `createdAt`, `updatedAt`) VALUES
(2, '8b5465e8-2677-46c6-92f6-3c01fe7186e1', 1, 2, 56, '2023-01-05', '2024-01-16 09:12:59', '2024-01-16 10:40:36'),
(3, 'c01cab3b-78d3-4030-b8ce-f7cffc680164', 1, 2, 59, '2023-05-01', '2024-01-16 09:14:05', '2024-01-16 10:40:59'),
(4, '32d65563-562f-404d-8900-2688c4067fe0', 1, 2, 70, '2023-09-05', '2024-01-16 09:14:25', '2024-01-16 10:41:09'),
(5, 'cee5b3d1-2c0a-44d5-8490-8ace47517a71', 2, 2, 34, '2023-01-05', '2024-01-16 10:22:49', '2024-01-16 10:42:26'),
(6, 'cce2c1a7-dc4d-4433-afb0-874177c36233', 2, 2, 67, '2023-05-01', '2024-01-16 10:24:14', '2024-01-16 10:42:54'),
(7, '89dda5c4-c6d3-477e-931d-f4c66adcbcd1', 1, 2, 23, '2024-01-05', '2024-01-16 10:29:02', '2024-01-16 10:41:28'),
(9, 'ed50cfdf-6b55-4592-9a49-4bd8dce0b7e3', 2, 2, 61, '2024-01-05', '2024-01-16 10:43:42', '2024-01-16 10:43:42'),
(10, 'f23bec52-87d0-4d26-8352-1f690b34946b', 2, 2, 87, '2023-09-05', '2024-01-16 10:44:47', '2024-01-16 10:44:47'),
(11, 'b23e1e1f-12b6-4637-91ee-193a66772b56', 1, 4, 34, '2023-01-05', '2024-01-16 13:39:01', '2024-01-16 13:39:01'),
(12, '9cbf5c45-ad96-43e0-b1cd-ee78ec6b88ce', 1, 4, 51, '2023-05-01', '2024-01-16 13:42:00', '2024-01-17 13:38:35'),
(13, '892e6fce-c4dc-4265-97fb-1c4bd4a58c27', 2, 4, 78, '2023-01-05', '2024-01-16 14:07:26', '2024-01-16 14:07:26'),
(14, '84ce95e7-750e-4839-a620-80cebc9fe8a8', 2, 4, 82, '2023-05-01', '2024-01-16 14:08:06', '2024-01-17 13:18:00'),
(15, 'a2805365-2a80-400f-a5f0-41214f680b6d', 3, 2, 80, '2023-01-05', '2024-01-16 14:22:37', '2024-01-16 14:22:37'),
(16, '98d0b543-2c8b-45d4-accd-9bae72d8b8a6', 3, 2, 41, '2023-05-01', '2024-01-16 14:22:57', '2024-01-16 14:22:57'),
(17, 'eff8e354-8195-4b2d-83fe-6de4e303aaf2', 3, 2, 96, '2023-09-05', '2024-01-16 14:23:33', '2024-01-16 14:23:33');

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(13, '0ed3ffb1-f0e9-4d97-bbf6-aae6cd913873', 'As_', '2024-01-10 11:30:15', '2024-01-10 11:30:15'),
(14, '7f4cdf28-1a7b-4205-bc66-ada7d434bad6', 'Cd_', '2024-01-17 13:44:41', '2024-01-17 13:44:41'),
(15, '79b4eb75-296a-4b4f-9bf4-112bce3488c6', 'Ni_', '2024-01-17 13:44:48', '2024-01-17 13:44:48'),
(16, '90948669-248b-456f-ac85-de11d7a115b9', 'Pb_', '2024-01-17 13:44:58', '2024-01-17 13:44:58'),
(17, '8d846405-7be3-4056-be02-683e27dcf478', 'benzo(a)pyrene', '2024-01-17 13:45:17', '2024-01-17 13:45:17'),
(18, 'e5080714-c971-4d11-b56e-58eb4bbf38c2', 'benzene', '2024-01-17 13:45:32', '2024-01-17 13:45:32'),
(19, 'a282c2ae-fd6e-4d10-8910-7938f86b42d1', 'OC/EC', '2024-01-17 13:45:42', '2024-01-17 13:45:42');

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
('2p2Uy6E87kn8di4d_4S25FP-jyhLs0MW', '2024-01-18 13:45:17', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:45:17', '2024-01-17 13:45:17'),
('Ac_xMxb-IL1-IpOMsoQxjSuXxxlyth3-', '2024-01-18 13:45:32', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:45:32', '2024-01-17 13:45:32'),
('eNYb0xWQwEVnohXAnm_SpjOHfFGehR8U', '2024-01-18 13:44:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:44:48', '2024-01-17 13:44:48'),
('gW7n71GaC_qnkIDWrrhkN14sxskGKI4z', '2024-01-18 13:45:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:45:42', '2024-01-17 13:45:42'),
('hAZbPLNveFp4OT6lkxRoTzLH47muWUnT', '2024-01-18 16:00:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"37ca1953-2a98-4623-8a51-99729ca432da\"}', '2024-01-15 08:53:15', '2024-01-17 16:00:12'),
('ihPl1S8_SJn6bR1UyJxxU08r5ga3fJBx', '2024-01-18 13:44:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:44:21', '2024-01-17 13:44:21'),
('k8jcQXMLEEQ7O4auBHfkuxcT_AzOPO36', '2024-01-18 13:18:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:18:00', '2024-01-17 13:18:00'),
('lTGD4YGeJGQujmoYcfNa9AOXVQxBntpr', '2024-01-18 13:44:36', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:44:36', '2024-01-17 13:44:36'),
('rG1cd_mxb61cdpCHxGLrNMkAqSqkpnbv', '2024-01-18 13:44:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:44:58', '2024-01-17 13:44:58'),
('u_h8tePc4yF_niDuoBM1vqcmBGrx36Qr', '2024-01-18 13:38:35', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:38:35', '2024-01-17 13:38:35'),
('yungjj_4U16Ij-BTwa9QuulE1d_NlVEa', '2024-01-18 13:17:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-17 13:17:24', '2024-01-17 13:17:24');

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
