-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03 Des 2017 pada 05.52
-- Versi Server: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `predicx`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `departemens`
--

CREATE TABLE `departemens` (
  `id` int(11) NOT NULL,
  `nama_departemen` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `departemens`
--

INSERT INTO `departemens` (`id`, `nama_departemen`, `createdAt`, `updatedAt`) VALUES
(1, 'Statistika', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(2, 'Geofisika dan Meteorologi', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(3, 'Biologi', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(4, 'Kimia', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(5, 'Matematika', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(6, 'Ilmu Komputer', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(7, 'Fisika', '2017-11-30 16:57:49', '2017-11-30 16:57:49'),
(8, 'Biokimia', '2017-11-30 16:57:49', '2017-11-30 16:57:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `historymatakuliahs`
--

CREATE TABLE `historymatakuliahs` (
  `id` int(11) NOT NULL,
  `fk_mahasiswa_id` int(11) DEFAULT NULL,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswamodels`
--

CREATE TABLE `mahasiswamodels` (
  `id` int(11) NOT NULL,
  `file_model` varchar(255) DEFAULT NULL,
  `file_model_scaler` varchar(255) DEFAULT NULL,
  `fk_mahasiswa_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswas`
--

CREATE TABLE `mahasiswas` (
  `id` int(11) NOT NULL,
  `nama_mahasiswa` varchar(255) DEFAULT NULL,
  `nim_mahasiswa` varchar(255) DEFAULT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `password_user` varchar(255) DEFAULT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `fk_departemen_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `mahasiswas`
--

INSERT INTO `mahasiswas` (`id`, `nama_mahasiswa`, `nim_mahasiswa`, `nama_user`, `password_user`, `email_user`, `role`, `fk_departemen_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Reza Bagus Permana', 'G64140023', 'reza_bagusp', '264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb', 'rezabaguspermana.rbp@gmail.com', 'mahasiswa', 6, '2017-11-30 16:58:26', '2017-11-30 16:58:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `matakuliahs`
--

CREATE TABLE `matakuliahs` (
  `id` int(11) NOT NULL,
  `kode_mata_kuliah` varchar(255) DEFAULT NULL,
  `nama_mata_kuliah` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilaimatakuliahs`
--

CREATE TABLE `nilaimatakuliahs` (
  `id` int(11) NOT NULL,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `fk_nilai_mutu_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilaimutus`
--

CREATE TABLE `nilaimutus` (
  `id` int(11) NOT NULL,
  `batas_bawah` int(11) DEFAULT NULL,
  `batas_atas` int(11) DEFAULT NULL,
  `huruf_mutu` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departemens`
--
ALTER TABLE `departemens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `historymatakuliahs`
--
ALTER TABLE `historymatakuliahs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`),
  ADD KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`);

--
-- Indexes for table `mahasiswamodels`
--
ALTER TABLE `mahasiswamodels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`);

--
-- Indexes for table `mahasiswas`
--
ALTER TABLE `mahasiswas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_departemen_id` (`fk_departemen_id`);

--
-- Indexes for table `matakuliahs`
--
ALTER TABLE `matakuliahs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilaimatakuliahs`
--
ALTER TABLE `nilaimatakuliahs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  ADD KEY `fk_nilai_mutu_id` (`fk_nilai_mutu_id`);

--
-- Indexes for table `nilaimutus`
--
ALTER TABLE `nilaimutus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departemens`
--
ALTER TABLE `departemens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `historymatakuliahs`
--
ALTER TABLE `historymatakuliahs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mahasiswamodels`
--
ALTER TABLE `mahasiswamodels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mahasiswas`
--
ALTER TABLE `mahasiswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `matakuliahs`
--
ALTER TABLE `matakuliahs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `nilaimatakuliahs`
--
ALTER TABLE `nilaimatakuliahs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `nilaimutus`
--
ALTER TABLE `nilaimutus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `historymatakuliahs`
--
ALTER TABLE `historymatakuliahs`
  ADD CONSTRAINT `historymatakuliahs_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`),
  ADD CONSTRAINT `historymatakuliahs_ibfk_2` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`);

--
-- Ketidakleluasaan untuk tabel `mahasiswamodels`
--
ALTER TABLE `mahasiswamodels`
  ADD CONSTRAINT `mahasiswamodels_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`);

--
-- Ketidakleluasaan untuk tabel `mahasiswas`
--
ALTER TABLE `mahasiswas`
  ADD CONSTRAINT `mahasiswas_ibfk_1` FOREIGN KEY (`fk_departemen_id`) REFERENCES `departemens` (`id`);

--
-- Ketidakleluasaan untuk tabel `nilaimatakuliahs`
--
ALTER TABLE `nilaimatakuliahs`
  ADD CONSTRAINT `nilaimatakuliahs_ibfk_1` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`),
  ADD CONSTRAINT `nilaimatakuliahs_ibfk_2` FOREIGN KEY (`fk_nilai_mutu_id`) REFERENCES `nilaimutus` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
