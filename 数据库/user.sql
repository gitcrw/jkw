/*
Navicat MySQL Data Transfer

Source Server         : crw
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : 1904

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-06-15 12:08:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` bigint(20) unsigned NOT NULL,
  `password` varchar(255) NOT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`,`phone`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '15917211886', '123', '2019-06-06 18:07:13');
INSERT INTO `user` VALUES ('18', '15917211884', '123456', '2019-06-06 20:02:44');
INSERT INTO `user` VALUES ('19', '15917211885', '1234567', '2019-06-15 11:52:03');
INSERT INTO `user` VALUES ('20', '13686910162', '123456', '2019-06-14 18:07:40');
