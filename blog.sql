-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2023 a las 20:49:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(75) NOT NULL,
  `subtitle` varchar(150) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `sectionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `title`, `subtitle`, `img`, `sectionId`, `createdAt`, `updatedAt`) VALUES
(1, 'Viaje a Roma', 'Pizzas al mejor precio', 'roma.png', 1, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(2, 'Viaje a Toledo', 'Toletum y buen acero', 'toledo.jpg', 1, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(3, 'Viaje a Salamanca', 'Hay ranas', 'salamanca.jpg', 1, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(4, 'Viaje a Uganda', 'Hay gente y no nieva (por ahora)', 'uganda-forever.jpg', 1, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(5, 'Roma 2', 'Pizzas 2', 'roma.png', 2, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(6, 'Toledo 2', 'Toletum', 'toledo.jpg', 2, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(7, 'Salamanca 2', '', 'salamanca.jpg', 2, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(8, 'Uganda 2', '', 'uganda-forever.jpg', 2, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(9, '10 tips para ir a la playa', 'Playa playa playa', 'playa.jpg', 3, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(10, '10 trucos para hacer la maleta', '', 'maleta.jpg', 3, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(11, '3 tips para viajar en coche', 'No te dejes el bocadillo', 'car.jpg', 3, '2023-07-20 18:48:03', '2023-07-20 18:48:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `section` varchar(100) NOT NULL,
  `order` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sections`
--

INSERT INTO `sections` (`id`, `section`, `order`, `createdAt`, `updatedAt`) VALUES
(1, 'Últimos Posts', 1, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(2, 'Guías', 2, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(3, 'Tips', 3, '2023-07-20 18:48:03', '2023-07-20 18:48:03'),
(4, 'Sección sin contenido', 4, '2023-07-20 18:48:03', '2023-07-20 18:48:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
