/*
Navicat MySQL Data Transfer

Source Server         : XAMPP Local
Source Server Version : 100116
Source Host           : localhost:3306
Source Database       : predicx

Target Server Type    : MYSQL
Target Server Version : 100116
File Encoding         : 65001

Date: 2017-12-05 20:10:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for departemens
-- ----------------------------
DROP TABLE IF EXISTS `departemens`;
CREATE TABLE `departemens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_departemen` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of departemens
-- ----------------------------
INSERT INTO `departemens` VALUES ('1', 'Statistika', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('2', 'Geofisika dan Meteorologi', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('3', 'Biologi', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('4', 'Kimia', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('5', 'Matematika', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('6', 'Ilmu Komputer', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('7', 'Fisika', '2017-11-30 16:57:49', '2017-11-30 16:57:49');
INSERT INTO `departemens` VALUES ('8', 'Biokimia', '2017-11-30 16:57:49', '2017-11-30 16:57:49');

-- ----------------------------
-- Table structure for historymatakuliahs
-- ----------------------------
DROP TABLE IF EXISTS `historymatakuliahs`;
CREATE TABLE `historymatakuliahs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_mahasiswa_id` int(11) DEFAULT NULL,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  CONSTRAINT `historymatakuliahs_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`),
  CONSTRAINT `historymatakuliahs_ibfk_2` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of historymatakuliahs
-- ----------------------------

-- ----------------------------
-- Table structure for mahasiswamodels
-- ----------------------------
DROP TABLE IF EXISTS `mahasiswamodels`;
CREATE TABLE `mahasiswamodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_model` varchar(255) DEFAULT NULL,
  `file_model_scaler` varchar(255) DEFAULT NULL,
  `fk_mahasiswa_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`),
  CONSTRAINT `mahasiswamodels_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of mahasiswamodels
-- ----------------------------

-- ----------------------------
-- Table structure for mahasiswas
-- ----------------------------
DROP TABLE IF EXISTS `mahasiswas`;
CREATE TABLE `mahasiswas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_mahasiswa` varchar(255) DEFAULT NULL,
  `nim_mahasiswa` varchar(255) DEFAULT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `password_user` varchar(255) DEFAULT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `fk_departemen_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_departemen_id` (`fk_departemen_id`),
  CONSTRAINT `mahasiswas_ibfk_1` FOREIGN KEY (`fk_departemen_id`) REFERENCES `departemens` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of mahasiswas
-- ----------------------------
INSERT INTO `mahasiswas` VALUES ('1', 'Reza Bagus Permana', 'G64140023', 'reza_bagusp', '264c8c381bf16c982a4e59b0dd4c6f7808c51a05f64c35db42cc78a2a72875bb', 'rezabaguspermana.rbp@gmail.com', 'mahasiswa', '6', '2017-11-30 16:58:26', '2017-11-30 16:58:26');
INSERT INTO `mahasiswas` VALUES ('2', 'Selfi Qisthina', 'G64140059', 'selfi_qisthina', 'b47641d221b67a5ab7309211ed96c33a93501b467ec6abc4f6bcc788ba751c8b', 'selfiqisthina@yahoo.com', 'mahasiswa', '6', '2017-12-05 17:29:33', '2017-12-05 17:29:33');
INSERT INTO `mahasiswas` VALUES ('3', 'Fadhlal Khaliq Surado', 'G64140015', 'surado_rajomudo', 'f9b75e3010b17e6ad52645da0bbe8d60e61db9926c622fdd7cb2a6f0c559d3e5', 'fksutan.rajomudo@gmail.com', 'mahasiswa', '6', '2017-12-05 17:36:03', '2017-12-05 17:36:03');
INSERT INTO `mahasiswas` VALUES ('4', 'Muhammad Rofiq Gempur Tirani', 'G64140062', 'muhammad_rofiq', 'f3834f5a37011ac1619847c339a2ff3d616524ceccbe8ee82d6a6ae4e9f8e673', 'Muhamad.rofiq@gmail.com', 'mahasiswa', '6', '2017-12-05 17:39:17', '2017-12-05 17:39:17');
INSERT INTO `mahasiswas` VALUES ('5', 'ISFAN ADILA FAJRIAN', 'G64140083', 'isfan_adila', 'c82fd42e9161a075bf8b9d9380f7771419df487c1f0eac92325525b04df8bba1', 'isfun_2_be_me@hotmail.com', 'mahasiswa', '6', '2017-12-05 17:42:33', '2017-12-05 17:42:33');
INSERT INTO `mahasiswas` VALUES ('6', 'Parhan Zikkry Padly', 'G64140011', 'parhan_lenovoz', 'c7e0c7fee3f1c309d0729da34544f476f2d98b1c8998cc06b148be30da53e32a', 'parhanzikkry@yahoo.com', 'mahasiswa', '6', '2017-12-05 17:56:13', '2017-12-05 17:56:13');
INSERT INTO `mahasiswas` VALUES ('7', 'Ilman Na\'Afian Wirawan', 'G64140024', 'ilman_nw', '9eb756f81c53c334a1e0d22ee97aff818a2aebfa9ba21a45e855f76a63073cdb', 'ilcong_13@hotmail.com', 'mahasiswa', '6', '2017-12-05 17:57:04', '2017-12-05 17:57:04');
INSERT INTO `mahasiswas` VALUES ('8', 'AKHIYAR WALADI', 'G64130012', 'akiyar', '2e7216bfce734bc033e2cdecdd440acdbfc7fb03a1a6a2ee2974d77136c90930', 'akiyar@student.ipb.ac.id', 'mahasiswa', '6', '2017-12-05 17:57:43', '2017-12-05 17:57:43');
INSERT INTO `mahasiswas` VALUES ('9', 'ARIEF MAULIDY N', 'G64140075', 'arief_maulidy', '1f13df4c397d8766846c853eef8c51c14de8b5cebd985c9609741479bd5f5fe3', 'arief.maulidy14@gmail.com', 'mahasiswa', '6', '2017-12-05 18:23:48', '2017-12-05 18:23:48');

-- ----------------------------
-- Table structure for matakuliahs
-- ----------------------------
DROP TABLE IF EXISTS `matakuliahs`;
CREATE TABLE `matakuliahs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_mata_kuliah` varchar(255) DEFAULT NULL,
  `nama_mata_kuliah` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `is_class` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of matakuliahs
-- ----------------------------
INSERT INTO `matakuliahs` VALUES ('1', 'mat219', 'Aljabar Linear', '3', '1', '2017-12-05 18:33:02', '2017-12-05 18:33:05');
INSERT INTO `matakuliahs` VALUES ('2', 'mat232', 'Pemrograman Linear', '4', '1', '2017-12-05 18:33:19', '2017-12-05 18:33:21');
INSERT INTO `matakuliahs` VALUES ('3', 'mat234', 'Graf Algoritmik', '4', '1', '2017-12-05 18:33:42', '2017-12-05 18:33:46');
INSERT INTO `matakuliahs` VALUES ('4', 'mat100', 'Pengantar Matematika', '1', '0', '2017-12-05 19:01:26', '2017-12-05 19:01:31');
INSERT INTO `matakuliahs` VALUES ('5', 'mat103', 'Kalkulus', '2', '0', '2017-12-05 19:01:44', '2017-12-05 19:01:48');
INSERT INTO `matakuliahs` VALUES ('6', 'kom101', 'Algoritme', '2', '0', '2017-12-05 19:02:09', '2017-12-05 19:02:12');
INSERT INTO `matakuliahs` VALUES ('7', 'stk201', 'Metode Statistika', '3', '0', '2017-12-05 19:02:54', '2017-12-05 19:02:59');
INSERT INTO `matakuliahs` VALUES ('8', 'kom209', 'Struktur Diskret', '3', '0', '2017-12-05 19:03:29', '2017-12-05 19:03:32');
INSERT INTO `matakuliahs` VALUES ('9', 'kom220', 'TOK/Pengantar Matematika Komputasi', '4', '0', '2017-12-05 19:04:29', '2017-12-05 19:04:31');
INSERT INTO `matakuliahs` VALUES ('10', 'kom325', 'Komputasi Numerik', '5', '0', '2017-12-05 19:14:55', '2017-12-05 19:14:58');
INSERT INTO `matakuliahs` VALUES ('11', 'kom200', 'Dasar Pemrograman', '3', '0', '2017-12-05 19:15:46', '2017-12-05 19:15:49');
INSERT INTO `matakuliahs` VALUES ('12', 'mat331', 'Pemrograman Tak Linear', '5', '1', '2017-12-05 19:16:48', '2017-12-05 19:16:51');
INSERT INTO `matakuliahs` VALUES ('13', 'mat431', 'Pemodelan Riset Operasi', '7', '1', '2017-12-05 19:17:29', '2017-12-05 19:17:32');

-- ----------------------------
-- Table structure for nilaimatakuliahs
-- ----------------------------
DROP TABLE IF EXISTS `nilaimatakuliahs`;
CREATE TABLE `nilaimatakuliahs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `fk_nilai_mutu_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  KEY `fk_nilai_mutu_id` (`fk_nilai_mutu_id`),
  CONSTRAINT `nilaimatakuliahs_ibfk_1` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`),
  CONSTRAINT `nilaimatakuliahs_ibfk_2` FOREIGN KEY (`fk_nilai_mutu_id`) REFERENCES `nilaimutus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nilaimatakuliahs
-- ----------------------------

-- ----------------------------
-- Table structure for nilaimutus
-- ----------------------------
DROP TABLE IF EXISTS `nilaimutus`;
CREATE TABLE `nilaimutus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batas_bawah` int(11) DEFAULT NULL,
  `batas_atas` int(11) DEFAULT NULL,
  `huruf_mutu` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nilaimutus
-- ----------------------------

-- ----------------------------
-- Table structure for syaratmatakuilahs
-- ----------------------------
DROP TABLE IF EXISTS `syaratmatakuilahs`;
CREATE TABLE `syaratmatakuilahs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `syarat_mata_kuliah_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  CONSTRAINT `syaratmatakuilahs_ibfk_1` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of syaratmatakuilahs
-- ----------------------------
INSERT INTO `syaratmatakuilahs` VALUES ('1', '1', '4', '2017-12-05 19:23:05', '2017-12-05 19:23:08');
INSERT INTO `syaratmatakuilahs` VALUES ('2', '1', '5', '2017-12-05 19:23:30', '2017-12-05 19:23:32');
INSERT INTO `syaratmatakuilahs` VALUES ('3', '2', '4', '2017-12-05 19:23:52', '2017-12-05 19:23:55');
INSERT INTO `syaratmatakuilahs` VALUES ('4', '2', '5', '2017-12-05 19:24:05', '2017-12-05 19:24:09');
INSERT INTO `syaratmatakuilahs` VALUES ('5', '2', '7', '2017-12-05 19:24:37', '2017-12-05 19:24:40');
INSERT INTO `syaratmatakuilahs` VALUES ('6', '2', '6', '2017-12-05 19:25:00', '2017-12-05 19:25:02');
INSERT INTO `syaratmatakuilahs` VALUES ('7', '2', '1', '2017-12-05 19:25:10', '2017-12-05 19:25:13');
INSERT INTO `syaratmatakuilahs` VALUES ('8', '3', '4', '2017-12-05 19:25:34', '2017-12-05 19:25:36');
INSERT INTO `syaratmatakuilahs` VALUES ('9', '3', '6', '2017-12-05 19:26:14', '2017-12-05 19:26:17');
INSERT INTO `syaratmatakuilahs` VALUES ('10', '3', '8', '2017-12-05 19:26:23', '2017-12-05 19:26:26');
INSERT INTO `syaratmatakuilahs` VALUES ('11', '12', '4', '2017-12-05 19:27:41', '2017-12-05 19:27:44');
INSERT INTO `syaratmatakuilahs` VALUES ('12', '12', '5', '2017-12-05 19:27:53', '2017-12-05 19:27:56');
INSERT INTO `syaratmatakuilahs` VALUES ('13', '12', '9', '2017-12-05 19:28:09', '2017-12-05 19:28:12');
INSERT INTO `syaratmatakuilahs` VALUES ('14', '12', '10', '2017-12-05 19:28:44', '2017-12-05 19:28:47');
INSERT INTO `syaratmatakuilahs` VALUES ('15', '13', '4', '2017-12-05 19:29:06', '2017-12-05 19:29:09');
INSERT INTO `syaratmatakuilahs` VALUES ('16', '13', '5', '2017-12-05 19:29:15', '2017-12-05 19:29:17');
INSERT INTO `syaratmatakuilahs` VALUES ('17', '13', '2', '2017-12-05 19:29:29', '2017-12-05 19:29:31');
INSERT INTO `syaratmatakuilahs` VALUES ('18', '13', '3', '2017-12-05 19:29:49', '2017-12-05 19:29:51');
INSERT INTO `syaratmatakuilahs` VALUES ('19', '13', '6', '2017-12-05 19:30:02', '2017-12-05 19:30:04');
INSERT INTO `syaratmatakuilahs` VALUES ('20', '13', '11', '2017-12-05 19:30:23', '2017-12-05 19:30:25');
