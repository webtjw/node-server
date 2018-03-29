/*
Navicat MySQL Data Transfer

Source Server         : jiawei
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : techsite

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-29 16:11:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `tags` text NOT NULL,
  `time` text NOT NULL,
  `description` text,
  `codeText` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('78', '标题', 'javascript,css', '2018-03-20', 'null - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线；', '介绍垃圾');
INSERT INTO `article` VALUES ('79', '标题', 'css', '2018-03-29', '123\n', '#t 标题\n123\n<!-- more -->\n456 - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线； - 选择工具栏展现工具：文章 title，粗体，标题，下划线，删除线，标记，居中，引用，列表（有无序），链接，图片上传，代码片段，代码块，表格，undo，redo，save，全屏，more 分割线；');

-- ----------------------------
-- Table structure for `developer`
-- ----------------------------
DROP TABLE IF EXISTS `developer`;
CREATE TABLE `developer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of developer
-- ----------------------------
INSERT INTO `developer` VALUES ('1', 'tanjiawei', 'wayne');

-- ----------------------------
-- Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'javascript', '0');
INSERT INTO `tags` VALUES ('2', 'css', '0');
INSERT INTO `tags` VALUES ('3', 'Vue', '0');
