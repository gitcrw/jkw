/*
Navicat MySQL Data Transfer

Source Server         : crw
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : 1904

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-06-15 12:08:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodscar
-- ----------------------------
DROP TABLE IF EXISTS `goodscar`;
CREATE TABLE `goodscar` (
  `gid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  PRIMARY KEY (`gid`,`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodscar
-- ----------------------------
INSERT INTO `goodscar` VALUES ('1', '1', '112');
INSERT INTO `goodscar` VALUES ('2', '1', '10');
INSERT INTO `goodscar` VALUES ('3', '1', '48');
INSERT INTO `goodscar` VALUES ('22', '20', '5');
