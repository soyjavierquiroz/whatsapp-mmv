-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2024 a las 20:16:41
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mmw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosbot`
--

CREATE TABLE `datosbot` (
  `id` int(11) NOT NULL,
  `numero_cel` varchar(20) DEFAULT NULL,
  `variableguardar` varchar(255) DEFAULT NULL,
  `valorGuardado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flujosbot`
--

CREATE TABLE `flujosbot` (
  `id` int(11) NOT NULL,
  `palabra` varchar(255) DEFAULT NULL,
  `media` tinyint(1) DEFAULT NULL,
  `urlMedia` varchar(255) DEFAULT NULL,
  `sigueFlujo` tinyint(1) DEFAULT NULL,
  `messageResponse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `flujosbotcontinua`
--

CREATE TABLE `flujosbotcontinua` (
  `id` int(11) NOT NULL,
  `id_flujo` int(11) DEFAULT NULL,
  `variableguardar` varchar(255) DEFAULT NULL,
  `respuestaAlGuardar` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `abreviacion` varchar(255) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `media` tinyint(1) DEFAULT NULL,
  `urlMedia` varchar(255) DEFAULT NULL,
  `intervaloMessage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `numbers`
--

CREATE TABLE `numbers` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numero_cel` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportmessage`
--

CREATE TABLE `reportmessage` (
  `id` int(11) NOT NULL,
  `numero_cel` varchar(20) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `urlMedia` varchar(255) DEFAULT NULL,
  `estadoEnvio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `activo`) VALUES
(1, 'Enbo', 'Enbo@gmail.com', 'EnboOrtiz', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datosbot`
--
ALTER TABLE `datosbot`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `flujosbot`
--
ALTER TABLE `flujosbot`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `flujosbotcontinua`
--
ALTER TABLE `flujosbotcontinua`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `numbers`
--
ALTER TABLE `numbers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reportmessage`
--
ALTER TABLE `reportmessage`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `datosbot`
--
ALTER TABLE `datosbot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `flujosbot`
--
ALTER TABLE `flujosbot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `flujosbotcontinua`
--
ALTER TABLE `flujosbotcontinua`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `numbers`
--
ALTER TABLE `numbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reportmessage`
--
ALTER TABLE `reportmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
