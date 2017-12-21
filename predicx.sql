/*
Navicat MySQL Data Transfer

Source Server         : XAMPP Local
Source Server Version : 100116
Source Host           : localhost:3306
Source Database       : predicx

Target Server Type    : MYSQL
Target Server Version : 100116
File Encoding         : 65001

Date: 2017-12-21 15:09:10
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
  `fk_nilai_mutu_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  CONSTRAINT `historymatakuliahs_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`),
  CONSTRAINT `historymatakuliahs_ibfk_2` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of historymatakuliahs
-- ----------------------------
INSERT INTO `historymatakuliahs` VALUES ('1', '1', '4', '4', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('2', '1', '5', '4', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('3', '3', '4', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('4', '3', '5', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('5', '3', '1', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('6', '3', '2', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('7', '3', '3', '2', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('8', '3', '6', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('9', '3', '7', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('10', '3', '8', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('11', '3', '9', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('12', '3', '10', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('13', '3', '11', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('14', '3', '12', '2', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('15', '3', '19', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('16', '3', '20', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('17', '3', '21', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('18', '3', '22', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('19', '3', '25', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('20', '3', '26', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('21', '3', '27', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('22', '3', '28', '1', null, '2017-12-19 08:13:35', '2017-12-19 08:13:44');
INSERT INTO `historymatakuliahs` VALUES ('23', '4', '1', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('24', '4', '4', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('25', '4', '5', '4', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('26', '4', '6', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('27', '4', '7', '4', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('29', '4', '9', '5', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('30', '4', '8', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('31', '4', '10', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('32', '4', '19', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('33', '4', '12', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('34', '4', '20', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('35', '4', '21', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('36', '4', '22', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('37', '4', '23', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('38', '4', '24', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('39', '4', '25', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('40', '4', '26', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('41', '4', '27', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('42', '4', '28', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('43', '4', '29', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('44', '4', '33', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('45', '4', '34', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('46', '10', '1', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('47', '10', '4', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('48', '10', '5', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('49', '10', '6', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('50', '10', '7', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('51', '10', '8', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('52', '10', '9', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('53', '10', '10', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('54', '10', '11', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('55', '10', '19', '4', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('56', '10', '20', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('57', '10', '21', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('58', '10', '22', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('59', '10', '23', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('60', '10', '24', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('61', '10', '25', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('62', '10', '26', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('63', '10', '27', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('64', '10', '28', '2', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('65', '10', '29', '1', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `historymatakuliahs` VALUES ('66', '10', '33', '3', null, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

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
INSERT INTO `mahasiswas` VALUES ('10', 'M RAIHAN FAJRI', 'G64140074', 'raihan_fajri', '594d7741d32fbca8e664c209532947adb770d7ef602939d6bc6d0420f5df7a50', 'raihanfajri1206@gmail.com', 'mahasiswa', '6', '2017-12-20 18:17:31', '2017-12-20 18:17:31');

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

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
INSERT INTO `matakuliahs` VALUES ('14', 'stk211', 'Metode Penarikan Contoh', '4', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('15', 'stk222', 'Perancangan Percobaan', '4', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('16', 'stk331', 'Analisis Regresi', '5', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('17', 'stk351', 'Pengantar Analisis Kategorik', '6', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('18', 'stk351', 'Metode Peramalan Deret Waktu', '6', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('19', 'kpm130', 'Sosiologi Umum', '1', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('20', 'agb100', 'Pengantar Kewirausahaan', '1', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('21', 'stk202', 'Pengantar Hitung Peluang', '3', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('22', 'eko100', 'Ekonomi Umum', '3', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('23', 'ipb100', 'Agama', '2', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('24', 'ipb111', 'Pancasila', '2', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('25', 'kom205', 'Basis Data', '4', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('26', 'kom206', 'Organisasi dan Arsitektur Komputer', '6', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('27', 'kom203', 'Rangkaian Digital', '3', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('28', 'kom207', 'Struktur Data', '4', '0', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('29', 'ikk233', 'Perilaku Konsumen', '3', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('30', 'man111', 'Pengantar Manajemen', '3', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('31', 'kpm210', 'Dasar-Dasar Komunikasi', '3', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('32', 'ikk322', 'Pengembangan Karakter', '3', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('33', 'kom341', 'Pengantar Teknologi Spasial', '5', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('34', 'kom415', 'Pengantar SIstem Tertanam dan Robotika', '5', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');
INSERT INTO `matakuliahs` VALUES ('35', 'kom431', 'Temu Kembali Informasi', '5', '1', '2017-12-19 08:01:12', '2017-12-19 08:01:12');

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
  `huruf_mutu` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nilaimutus
-- ----------------------------
INSERT INTO `nilaimutus` VALUES ('1', '75', '100', 'A', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('2', '70', '75', 'AB', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('3', '65', '70', 'B', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('4', '60', '65', 'BC', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('5', '55', '60', 'C', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('6', '50', '55', 'D', '2017-12-19 07:30:55', '2017-12-19 07:30:55');
INSERT INTO `nilaimutus` VALUES ('7', '0', '50', 'E', '2017-12-19 07:30:55', '2017-12-19 07:30:55');

-- ----------------------------
-- Table structure for suggestions
-- ----------------------------
DROP TABLE IF EXISTS `suggestions`;
CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_mahasiswa_id` int(11) DEFAULT NULL,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `fk_nilai_mutu_id` int(11) DEFAULT NULL,
  `confidence` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mahasiswa_id` (`fk_mahasiswa_id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  KEY `fk_nilai_mutu_id` (`fk_nilai_mutu_id`),
  CONSTRAINT `suggestions_ibfk_1` FOREIGN KEY (`fk_mahasiswa_id`) REFERENCES `mahasiswas` (`id`),
  CONSTRAINT `suggestions_ibfk_2` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`),
  CONSTRAINT `suggestions_ibfk_3` FOREIGN KEY (`fk_nilai_mutu_id`) REFERENCES `nilaimutus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of suggestions
-- ----------------------------

-- ----------------------------
-- Table structure for syaratmatakuliahs
-- ----------------------------
DROP TABLE IF EXISTS `syaratmatakuliahs`;
CREATE TABLE `syaratmatakuliahs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_mata_kuliah_id` int(11) DEFAULT NULL,
  `syarat_mata_kuliah_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mata_kuliah_id` (`fk_mata_kuliah_id`),
  CONSTRAINT `syaratmatakuliahs_ibfk_1` FOREIGN KEY (`fk_mata_kuliah_id`) REFERENCES `matakuliahs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of syaratmatakuliahs
-- ----------------------------
INSERT INTO `syaratmatakuliahs` VALUES ('1', '1', '4', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('2', '1', '5', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('3', '2', '1', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('4', '2', '4', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('5', '2', '5', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('6', '2', '6', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('7', '2', '7', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('8', '3', '4', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('9', '3', '6', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('10', '3', '8', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('11', '12', '4', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('12', '12', '5', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('13', '12', '9', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('14', '12', '10', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('15', '13', '2', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('16', '13', '3', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('17', '13', '4', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('18', '13', '5', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('19', '13', '6', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('20', '13', '11', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('21', '29', '19', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('22', '29', '20', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('23', '30', '19', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('24', '30', '20', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('25', '30', '22', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('26', '31', '19', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('27', '32', '23', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('28', '32', '24', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('29', '33', '7', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('30', '33', '25', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('31', '34', '26', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('32', '34', '27', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('33', '35', '8', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('34', '35', '11', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('35', '35', '21', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
INSERT INTO `syaratmatakuliahs` VALUES ('36', '35', '28', '2017-12-19 08:08:08', '2017-12-19 08:08:08');
