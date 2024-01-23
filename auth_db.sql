-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3308
-- Χρόνος δημιουργίας: 23 Ιαν 2024 στις 14:30:18
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
(1, 'db6bff60-2142-4e2f-96da-207c83c65056', 'Είσοδος ΧΥΤΑ', '38.06736111', '23.64736111', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 11:07:46', '2024-01-23 13:54:42'),
(2, 'a8ea3a6e-db16-4143-afab-f279a1fef9a3', 'ΕΜΑΚ Γραφεία', '38.07194444', '23.65708333', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 11:11:58', '2024-01-23 13:57:05'),
(3, '529a60a7-89b6-4251-9655-0ab43c8b33a1', 'ΕΜΑΚ Διαλογή', '38.07327778', '23.65883333', 'ΟΕΔΑ Δυτικής Αττικής', '2023-12-20 13:51:56', '2024-01-23 13:59:08'),
(4, '46ba7d80-9f0d-4f4d-87fc-35af9354240d', 'Σ.Μ.Α. Πρέσα', '37.98411111', '23.59477778', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2023-12-20 15:39:35', '2024-01-23 14:01:24'),
(5, '2eec2992-0a5d-4c6e-a22e-89dd6fd96108', 'Σ.Μ.Α. Μηχανουργείο', '37.98425000', '23.59419444', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2023-12-21 14:33:39', '2024-01-23 14:19:42'),
(6, 'a9e8944c-d074-4c6e-9f85-a925b6a456be', 'Σ.Μ.Α. Πλυντήριο', '37.98402778', '23.59344444', 'Σταθμός Μεταφόρτωσης Απορριμμάτων ΣΜΑ Σχιστού', '2024-01-10 11:24:55', '2024-01-23 14:21:03'),
(7, 'aa9b4b47-f82b-4b4a-aa4b-4ca6a2782841', 'Κλιμακοστάσιο παλαιού κτηρίου', '37.99763889', '23.77091667', 'Κεντρικές Υπηρεσίες', '2024-01-10 11:25:29', '2024-01-23 14:21:47'),
(8, 'df97fd67-c9e5-49f7-8584-471c97bdf2d5', 'Κλιμακοστάσιο νέου κτηρίου', '37.99763889', '23.77091667', 'Κεντρικές Υπηρεσίες', '2024-01-10 11:26:17', '2024-01-23 14:22:02');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(17, 'eff8e354-8195-4b2d-83fe-6de4e303aaf2', 3, 2, 96, '2023-09-05', '2024-01-16 14:23:33', '2024-01-16 14:23:33'),
(18, 'b122e333-0265-42bd-b30b-42e7efe2361f', 1, 5, 34, '2023-01-05', '2024-01-19 10:51:35', '2024-01-19 10:51:35'),
(19, '97880e85-339c-402f-a5bc-d1f13e31a1f4', 1, 5, 53, '2023-05-01', '2024-01-19 10:52:04', '2024-01-19 10:52:04'),
(20, '4293b945-27f5-4d4d-ab70-f7ad93273301', 1, 5, 160, '2023-09-05', '2024-01-19 10:52:40', '2024-01-19 10:52:40'),
(21, '8b1fc30b-9f3c-4116-9bcc-6bca8d1d516c', 2, 5, 41, '2023-01-05', '2024-01-19 11:02:51', '2024-01-19 11:02:51'),
(22, '6582a647-d694-46eb-a8e0-5733e8cd72b9', 2, 5, 87, '2023-05-01', '2024-01-19 11:03:22', '2024-01-19 11:03:22'),
(23, '920568c0-c075-472d-9535-294b0e355f71', 2, 5, 120, '2023-09-05', '2024-01-19 11:04:01', '2024-01-19 11:04:01');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `metric`
--

DROP TABLE IF EXISTS `metric`;
CREATE TABLE IF NOT EXISTS `metric` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `unit_desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Άδειασμα δεδομένων του πίνακα `metric`
--

INSERT INTO `metric` (`id`, `uuid`, `name`, `unit`, `unit_desc`, `createdAt`, `updatedAt`) VALUES
(2, '88f66f33-4b26-490f-b31c-1abb208b191c', 'PM10', 'μg/m3', 'PM10 is a mixture of particles suspended in the air that do not exceed 10 micrograms in diameter. It is harmful because it contains benzopyrenes, furans, dioxins and in short, carcinogenic heavy metals.', '2023-12-21 09:24:49', '2024-01-18 12:16:43'),
(4, '95cc5867-a1bb-4fef-9cd5-431dbe7f85fc', 'TSP', 'μg/m3', 'Trisodium phosphate is a strong chemical. Poisoning occurs if you swallow, breathe in, or spill large amounts of this substance on your skin.', '2023-12-21 13:46:26', '2024-01-18 12:21:33'),
(5, '456b52ac-7dab-474a-906e-d3282b0240fc', 'TEQ PCDD/Fs', 'fg/m3', 'desc teq', '2024-01-10 11:28:12', '2024-01-10 11:28:12'),
(6, '3a5209de-b8a8-4e71-84ea-68ed2349a67a', 'TEQ PCBS', 'fg/m3', 'desc teqpcb', '2024-01-10 11:28:22', '2024-01-10 11:28:22'),
(7, '3adc381c-bec5-4b6b-9021-5e5b887db377', 'ind PCBs', 'pg/m3', 'desc ind', '2024-01-10 11:28:49', '2024-01-10 11:28:49'),
(8, 'd1ace8f4-8455-4ef1-abfd-79023d9fcfa3', 'PM2.5', 'μg/m3', 'PM2.5 are atmospheric aerosols with a maximum diameter of 2.5 micrometers. This type of suspended particulate matter is considered the most dangerous to human health.', '2024-01-10 11:29:18', '2024-01-18 12:20:01'),
(9, '1c5f9c02-7b24-4aeb-b376-0917c20a94a7', 'SO2', 'μg/m3', 'desc SO2', '2024-01-10 11:29:28', '2024-01-10 11:29:28'),
(10, '8cea1dbd-da3e-4af7-8e4b-9304f0e3d1ce', 'CO', 'mg/m3', 'desc CO', '2024-01-10 11:29:45', '2024-01-18 12:13:01'),
(11, '548c2c2c-401d-4367-a7a5-dd8a2a9d116d', 'NO2', 'μg/m3', 'desc NO2', '2024-01-10 11:29:56', '2024-01-10 11:29:56'),
(12, '8ccfb92c-0c28-4d27-80a2-b40e887068c5', 'NO', 'μg/m3', 'desc NO_', '2024-01-10 11:30:04', '2024-01-18 12:13:07'),
(13, '0ed3ffb1-f0e9-4d97-bbf6-aae6cd913873', 'As', 'ng/m3', 'desc As_', '2024-01-10 11:30:15', '2024-01-18 12:13:12'),
(14, '7f4cdf28-1a7b-4205-bc66-ada7d434bad6', 'Cd', 'ng/m3', 'desc Cd_', '2024-01-17 13:44:41', '2024-01-18 12:13:17'),
(15, '79b4eb75-296a-4b4f-9bf4-112bce3488c6', 'Ni', 'ng/m3', 'desc Ni_', '2024-01-17 13:44:48', '2024-01-18 12:13:22'),
(16, '90948669-248b-456f-ac85-de11d7a115b9', 'Pb', 'μg/m3', 'desc Pb_', '2024-01-17 13:44:58', '2024-01-18 12:13:28'),
(17, '8d846405-7be3-4056-be02-683e27dcf478', 'benzo(a)pyrene', 'ng/m3', 'desc benzo(a)pyrene', '2024-01-17 13:45:17', '2024-01-17 13:45:17'),
(18, 'e5080714-c971-4d11-b56e-58eb4bbf38c2', 'benzene', 'μg/m3', 'desc benzene', '2024-01-17 13:45:32', '2024-01-17 13:45:32'),
(19, 'a282c2ae-fd6e-4d10-8910-7938f86b42d1', 'OC/EC', 'μg/m3', 'desc OC/EC', '2024-01-17 13:45:42', '2024-01-17 13:45:42');

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
('2Fy5Lu8xt6XV55ZHQOhd4jz83IsMgD8X', '2024-01-24 14:01:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 14:01:24', '2024-01-23 14:01:24'),
('76hruajGhCZLlioAwrSwtGkPJlI_gBeQ', '2024-01-24 13:32:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:32:58', '2024-01-23 13:32:58'),
('dv730-ctw3xiQeRdwhyPkSNZzXxuzrkU', '2024-01-23 15:31:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"37ca1953-2a98-4623-8a51-99729ca432da\"}', '2024-01-22 15:23:32', '2024-01-22 15:31:07'),
('e5Q590uuApf5V22RfPm6edO9ckduX8g_', '2024-01-24 13:32:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:32:47', '2024-01-23 13:32:47'),
('IKIVj_rQCXQGdpM3vzeBkWMy_zondI8M', '2024-01-24 13:31:11', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:31:11', '2024-01-23 13:31:11'),
('IS3LwrrLBfILUb8Fs1T169lxhiaKBSBx', '2024-01-24 14:29:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"37ca1953-2a98-4623-8a51-99729ca432da\"}', '2024-01-22 09:01:26', '2024-01-23 14:29:33'),
('Jl9U2QfMIwYLAP9Dx4deYrC_J66f6wDq', '2024-01-24 13:33:56', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:33:56', '2024-01-23 13:33:56'),
('KFbSAOs9Eobs0-hOcrlAyguxHqgS7d_r', '2024-01-24 13:59:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:59:08', '2024-01-23 13:59:08'),
('mJZLnE6u8diNEGumgFiFN_WmJpGjhpul', '2024-01-24 13:34:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:34:45', '2024-01-23 13:34:45'),
('nil528UKZdqx64fkjE-hwZoa-H4vkGMg', '2024-01-24 14:22:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 14:22:02', '2024-01-23 14:22:02'),
('QznIizAoAhnlZ5Mp1t1f6G-vS_0DsTAs', '2024-01-24 14:19:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 14:19:42', '2024-01-23 14:19:42'),
('R6LpS62L6SgX5JMCKUTjn_woNAFfqjIx', '2024-01-24 13:54:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:54:42', '2024-01-23 13:54:42'),
('tKv13M7ylhFxFoeKufAoLJ-1nJzwfJCR', '2024-01-24 13:35:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:35:37', '2024-01-23 13:35:37'),
('TRC8s0gM3gYAW_4YfJOI4wGM8wzutLdq', '2024-01-24 13:57:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:57:05', '2024-01-23 13:57:05'),
('Uwfu0hE1yxjFuRLEQGM-zOQr3Lb77TWs', '2024-01-24 13:29:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:29:33', '2024-01-23 13:29:33'),
('w_ScLBb4_XGGqfSRkLEz_Cnhu9xT1srw', '2024-01-24 14:21:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 14:21:47', '2024-01-23 14:21:47'),
('WnKcYNih28hsNcDOb07n1oSqDe5JXJ1S', '2024-01-24 13:30:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:30:02', '2024-01-23 13:30:02'),
('yWn0s9_LktwcplL93khllM-hcekG7ZeH', '2024-01-24 14:21:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 14:21:03', '2024-01-23 14:21:03'),
('zHVAJ98f7RLVkQ4aVGeap4sE1UG972SA', '2024-01-24 13:31:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-01-23 13:31:49', '2024-01-23 13:31:49');

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
