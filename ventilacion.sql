-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2018 a las 20:24:51
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventilacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL DEFAULT 'desconocido',
  `expediente` varchar(20) DEFAULT 'desconocido',
  `peso` float(6,2) NOT NULL DEFAULT '0.00',
  `estatura` smallint(6) NOT NULL DEFAULT '0',
  `genero` varchar(3) NOT NULL DEFAULT 'I',
  `frecuenciaRespiratoria` smallint(6) NOT NULL DEFAULT '0',
  `vt` smallint(6) NOT NULL DEFAULT '0',
  `presionPico` smallint(6) NOT NULL DEFAULT '0',
  `presionMeseta` smallint(6) NOT NULL DEFAULT '0',
  `peep` smallint(6) NOT NULL DEFAULT '0',
  `fio2` float(8,2) NOT NULL DEFAULT '0.00',
  `poderMecanico` float(8,2) NOT NULL DEFAULT '0.00',
  `vt2` decimal(6,2) NOT NULL DEFAULT '0.00',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
